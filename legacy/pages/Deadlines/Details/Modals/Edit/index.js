import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import { FormatFullDateEN } from '@lhelpers/DateFunctions';

import Modal from '@lcomponents/Modal';
import Spinner from '@lcomponents/Spinner';
import Datepicker from '@lcomponents/DatePicker';

import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from '@lstore/ducks/Deadlines';

import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Input,
  TextArea,
  Row,
  Label,
  Badges,
  Badge,
  BadgeText,
  ReadBox,
  MarkAsRead,
  MarkAsReadText,
  Hour,
  HourText,
  Column,
} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Edit = forwardRef((props, ref) => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const dispatch = useDispatch();
  const { control, handleSubmit, setValue } = useForm();

  const types = useSelector(state => state.deadlines.types);
  const loadingTypes = useSelector(state => state.deadlines.loadingTypes);
  const processing = useSelector(state => state.deadlines.processing);

  const [deadline, setDeadline] = useState(props.deadline || null);
  //Refs
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const observationRef = useRef(null);
  //Data
  const [title, setTitle] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [date, setDate] = useState(props.date || new Date());
  const [hour, setHour] = useState(null);
  const [idAgenda, setIdAgenda] = useState(null);
  const [location, setLocation] = useState('');
  const [observation, setObservation] = useState('');
  // Errors
  const [titleErr, setTitleError] = useState(false);
  const [locationErr, setLocationError] = useState(false);
  const [observationErr, setObservationError] = useState(false);
  const [typesErr, setTypesErr] = useState(false);
  const [hourErr, setHourError] = useState(false);
  const [viewPicker, setViewPicker] = useState(false);

  const hidePicker = () => setViewPicker(false);

  const [defaultValues, setDefaultValues] = useState({
    titulo: '',
    diaInteiro: false,
    data: props.date || new Date(),
    hora: moment().format('hh:mm'),
    localizacao: '',
    observacao: '',
  });

  useEffect(() => {
    setDeadline(props.deadline || null);

    const diaInteiroValue = Boolean(props.deadline?.diaInteiro) || false;

    const tituloValue = props.deadline?.titulo || '';
    const dataValue = props.deadline?.dataHoraInicio
      ? moment(props.deadline.dataHoraInicio).toDate()
      : new Date();
    const localizacaoValue = props.deadline?.localizacao || '';
    const observacaoValue = props.deadline?.observacao || '';

    setTitle(tituloValue);
    setCurrentType(props.deadline?.idTipoEventoAgenda || 0);
    setAllDay(diaInteiroValue);
    setDate(
      props.deadline?.dataHoraInicio
        ? moment(props.deadline.dataHoraInicio).toDate()
        : new Date(),
    );
    setIdAgenda(props.deadline?.idAgenda || 0);
    // Só define a hora se o deadline não for dia inteiro e tiver hora formatada
    if (!diaInteiroValue && props.deadline?.horaFormatada) {
      setHour(props.deadline.horaFormatada);
    } else {
      setHour(null);
    }
    setLocation(localizacaoValue);
    setObservation(observacaoValue);

    // Inicializar valores do form
    setValue('titulo', tituloValue);
    setValue('diaInteiro', diaInteiroValue);
    setValue('data', FormatFullDateEN(dataValue));
    // Só define a hora no form se não for dia inteiro e tiver hora formatada
    if (!diaInteiroValue && props.deadline?.horaFormatada) {
      setValue('hora', props.deadline.horaFormatada);
    } else {
      setValue('hora', null);
    }
    setValue('localizacao', localizacaoValue);
    setValue('observacao', observacaoValue);

    setDefaultValues({
      titulo: tituloValue,
      diaInteiro: diaInteiroValue,
      data: dataValue,
      hora: !diaInteiroValue && props.deadline?.horaFormatada ? props.deadline.horaFormatada : null,
      localizacao: localizacaoValue,
      observacao: observacaoValue,
    });
  }, [props.deadline, setValue]);

  const handleConfirm = date => {
    const hour = moment(date).format('HH:mm');

    setHour(hour);

    hidePicker();

    return hour;
  };

  const resetValues = useCallback(() => {
    setTitle('');
    setLocation('');
    setObservation('');
    setAllDay(false);
    setCurrentType(null);
    setDate(props.date || new Date());
    setHour(null);
    setHourError(false);
  }, []);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const onSubmit = ({
    titulo,
    idAgenda,
    data,
    hora,
    observacao,
    localizacao,
    diaInteiro,
  }) => {
    if (!currentType) {
      setTypesErr(true);
      return;
    }

    // Validação: se não for dia inteiro, a hora é obrigatória
    if (!diaInteiro && !hora && !hour) {
      setHourError(true);
      return;
    } else {
      setHourError(false);
    }

    // Quando diaInteiro está marcado: inicia às 00:00:00
    // Quando desmarcado: usa a hora preenchida, ou 00:01:00 se não preencheu
    let horaInicio;
    if (diaInteiro) {
      horaInicio = '00:00:00';
    } else {
      const horaPreenchida = hora || hour;
      // Se não tem hora preenchida ou está vazia/null, usa 00:01:00
      if (!horaPreenchida || horaPreenchida === '00:00' || horaPreenchida === '00:00:00') {
        horaInicio = '00:01:00';
      } else {
        // Garante que a hora está no formato HH:mm:ss
        const horaFormatada = horaPreenchida.includes(':') 
          ? (horaPreenchida.split(':').length === 2 ? `${horaPreenchida}:00` : horaPreenchida)
          : '00:01:00';
        horaInicio = horaFormatada;
      }
    }
    
    const dataBase = moment(data || date);
    const dataHoraInicio = `${dataBase.format('YYYY-MM-DD')}T${horaInicio}`;

    // Quando diaInteiro está marcado: termina às 23:59:59 do mesmo dia
    // Quando desmarcado: adiciona 1 hora ao início
    const dataHoraFim = diaInteiro
      ? `${dataBase.format('YYYY-MM-DD')}T23:59:59`
      : moment(dataHoraInicio).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');

    const type = types.find(type => type.id == currentType);

    if (!type) {
      setTypesErr(true);

      return;
    }

    const allValues = {
      titulo,
      idAgenda,
      dataHoraFim,
      dataHoraInicio,
      sincronizado: false,
      idRepetEventoAgenda: -1,
      idOpcaoLembreteAgenda: -1,
      observacao: observacao || '',
      localizacao: localizacao || '',
      diaInteiro: diaInteiro !== undefined ? diaInteiro : false,
      idTipoEventoAgenda: type.id || null,
    };

    let values = {};

    Object.keys(allValues).map(key => {
      // Incluir diaInteiro mesmo quando for false
      if (key === 'diaInteiro') {
        values[key] = allValues[key];
      } else if (allValues[key]) {
        values[key] = allValues[key];
      }
    });

    const itens = [{ ...deadline, ...values }];

    dispatch(DeadlinesActions.deadlinesEdit(itens));

    props.onFishEdit(itens[0]);

    setTimeout(() => closeModal(), 500);

    resetValues();
  };

  const renderTypes = useCallback(
    () =>
      types.map((type, index) => (
        <Badge
          key={index}
          active={type.id == currentType}
          onPress={() => {
            setCurrentType(type.id);
            setTypesErr(false);
          }}
          error={typesErr}
        >
          <BadgeText active={type.id == currentType} error={typesErr}>
            {type.nome}
          </BadgeText>
        </Badge>
      )),
    [types, currentType, typesErr],
  );

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={handleSubmit(onSubmit)} disabled={processing}>
        {processing ? (
          <Spinner transparent={true} color={colors.white} height="auto" />
        ) : (
          <SubmitText>Salvar</SubmitText>
        )}
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Editar prazo" footer={footer()}>
      <Content>
        <Row>
          <Label>Título</Label>
          <Controller
            name="titulo"
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={() => (
              <Input
                value={title}
                ref={titleRef}
                error={titleErr}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nome do prazo"
                placeholderTextColor={colors.grayLight}
                returnKeyType="next"
                onChangeText={text => {
                  setTitle(text);
                  setTitleError(text.length < 2);
                  setValue('titulo', text);
                }}
              />
            )}
          />
        </Row>
        <Row>
          <Label>Tipo</Label>
          <Badges>{loadingTypes ? <Spinner /> : renderTypes()}</Badges>
        </Row>
        <Row>
          <Controller
            name="diaInteiro"
            control={control}
            defaultValue={false}
            rules={{ required: false }}
            render={() => (
              <ReadBox>
                <MarkAsRead>
                  <MarkAsReadText
                    onPress={() => {
                      const newValue = !allDay;
                      setAllDay(newValue);
                      setValue('diaInteiro', newValue);
                      // Se marcar dia todo, limpa o erro de hora
                      if (newValue) {
                        setHourError(false);
                      }
                    }}
                  >
                    Marcar como o dia todo
                  </MarkAsReadText>
                </MarkAsRead>
                <CheckBox
                  lineWidth={1.5}
                  boxType={'square'}
                  value={allDay}
                  onValueChange={newValue => {
                    setAllDay(newValue);
                    setValue('diaInteiro', newValue);
                    // Se marcar dia todo, limpa o erro de hora
                    if (newValue) {
                      setHourError(false);
                    }
                  }}
                  animationDuration={0.2}
                  tintColor={colors.primary}
                  onCheckColor={colors.white}
                  onFillColor={colors.primary}
                  onTintColor={colors.primary}
                  tintColors={{ true: colors.primary }}
                  style={{ width: 18, height: 18, marginRight: 12 }}
                />
              </ReadBox>
            )}
          />
        </Row>
        <Row>
          <Label>Data</Label>
          <Controller
            name="data"
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={() => (
              <Datepicker
                date={date}
                enabled={true}
                title="dd/mm/aaaa"
                style={{
                  flexGrow: 1,
                  maxWidth: 200,
                  height: 22,
                }}
                onDateChange={date => {
                  setDate(date);
                  setValue('data', FormatFullDateEN(date));
                }}
              />
            )}
          />
        </Row>
        {!allDay && (
          <Row error={hourErr}>
            <Label>Hora</Label>
            <Controller
              name="hora"
              control={control}
              defaultValue={null}
              rules={{ required: false }}
              render={() => (
                <Hour onPress={() => setViewPicker(true)}>
                  <HourText error={hourErr}>{hour || 'Selecione um horário'}</HourText>
                  <DateTimePickerModal
                    mode="time"
                    locale="en_GB"
                    isVisible={viewPicker}
                    onConfirm={date => {
                      const hourValue = handleConfirm(date);
                      setValue('hora', hourValue);
                      setHourError(false); // Limpa o erro quando selecionar uma hora
                    }}
                    onCancel={hidePicker}
                    headerTextIOS="Selecione uma data"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                  />
                </Hour>
              )}
            />
          </Row>
        )}
        <Row>
          <Label>Localização</Label>
          <Controller
            name="localizacao"
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={() => (
              <Input
                value={location}
                ref={locationRef}
                error={locationErr}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite uma localização"
                placeholderTextColor={colors.grayLight}
                returnKeyType="next"
                onChangeText={text => {
                  setLocation(text);
                  setLocationError(text.length < 2);
                  setValue('localizacao', text);
                }}
              />
            )}
          />
        </Row>
        <Row>
          <Column>
            <Label>Observações</Label>
            <Controller
              name="observacao"
              control={control}
              style={{ flexGrow: 0, flex: 1 }}
              defaultValue={null}
              rules={{ required: false }}
              render={() => (
                <TextArea
                  multiline
                  numberOfLines={5}
                  value={observation}
                  ref={observationRef}
                  error={observationErr}
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Digite uma observação"
                  placeholderTextColor={colors.grayLight}
                  returnKeyType="next"
                  onChangeText={text => {
                    setObservation(text);
                    setValue('observacao', text);
                  }}
                />
              )}
            />
          </Column>
        </Row>
      </Content>
    </Modal>
  );
});
