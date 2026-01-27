import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { TouchableOpacity, Platform } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import { useForm, Controller, reset } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Api from '@lservices/Api';

import { getLoggedUser } from '@lhelpers/Permissions';
import { FormatFullDateEN } from '@lhelpers/DateFunctions';

import Modal from '@lcomponents/Modal';
import Spinner from '@lcomponents/Spinner';
import Datepicker from '@lcomponents/DatePicker';

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
  DateStyle,
  Hour,
  HourText,
  Column,
} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default AddDeadline = forwardRef((props, ref) => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const dispatch = useDispatch();
  const { control, handleSubmit, setValue } = useForm();

  const types = useSelector(state => state.deadlines.types);
  const loadingTypes = useSelector(state => state.deadlines.loadingTypes);
  const processing = useSelector(state => state.deadlines.processing);

  //Props
  const [movement, setMovement] = useState(props.movement);
  const [idAgenda, setIdAgenda] = useState(0);
  //Refs
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const observationRef = useRef(null);
  //Data
  const [title, setTitle] = useState('');
  const [currentType, setCurrentType] = useState(null);
  const [allDay, setAllDay] = useState(false);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [location, setLocation] = useState('');
  const [observation, setObservation] = useState('');
  // Errors
  const [titleErr, setTitleError] = useState(false);
  const [dateErr, setDateError] = useState(false);
  const [hourErr, setHourError] = useState(false);
  const [locationErr, setLocationError] = useState(false);
  const [observationErr, setObservationError] = useState(false);
  const [typesErr, setTypesErr] = useState(false);
  const [viewPicker, setViewPicker] = useState(false);

  const [requiredFields, setRequiredFields] = useState({
    titulo: setTitleError,
    data: setDateError,
    hora: setHourError,
  });

  const hidePicker = () => setViewPicker(false);

  // const defaultValues = {
  //   titulo: '',
  //   diaInteiro: false,
  //   data: props.date || new Date(),
  //   hora: moment().format('hh:mm'),
  //   localizacao: '',
  //   observacao: '',
  // }

  useEffect(() => {
    getIdAgenda();

    dispatch(DeadlinesActions.deadlinesTypesRequest());
  }, [colors]);

  useEffect(() => setMovement(props.movement), [props]);

  const getIdAgenda = useCallback(() => {
    getLoggedUser().then(user =>
      Api.get(
        `/core/v1/agendas?campos=*&idUsuarioCliente=${user.idUsuarioCliente}`,
      ).then(({ data }) => setIdAgenda(data.itens[0]?.id || 0)),
    );
  }, []);

  const handleConfirm = date => {
    const hourValue = moment(date).format('HH:mm');

    setHour(hourValue);
    setHourError(false); // Limpa o erro quando o horário é definido

    hidePicker();

    return hourValue;
  };

  const resetValues = useCallback(() => {
    setTitle('');
    setLocation('');
    setObservation('');
    setAllDay(false);
    setCurrentType(null);
    setDate(null);
    setHour(null);
    getIdAgenda();

    setTitleError(false);
    setDateError(false);
    setHourError(false);
    // reset(defaultValues);
  }, []);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const onSubmit = ({
    titulo,
    observacao,
    localizacao,
    data,
    hora,
    diaInteiro,
  }) => {
    // Usa os valores do form, mas se não existirem, usa os estados locais
    const finalTitle = titulo || title;
    const finalDate = data || date;
    const finalHour = hora || hour;

    const hasErrors = checkRequiredFields({
      titulo: finalTitle,
      data: finalDate,
      hora: finalHour,
    });

    setTypesErr(!currentType);

    if (!currentType || hasErrors) return;

    const dataHoraInicio = `${moment(finalDate || new Date()).format(
      'YYYY-MM-DD',
    )}T${diaInteiro ? '00:00' : finalHour || '00:00'}:59`;

    const dataHoraFim = diaInteiro
      ? moment(dataHoraInicio).format('YYYY-MM-DDT23:59:00')
      : moment(dataHoraInicio).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');

    const type = types.find(type => type.id == currentType);

    if (!type) {
      setTypesErr(true);

      return;
    }

    const itens = [
      {
        titulo: finalTitle,
        idAgenda,
        dataHoraFim,
        dataHoraInicio,
        sincronizado: false,
        idRepetEventoAgenda: -1,
        idOpcaoLembreteAgenda: -1,
        observacao: observacao || '',
        localizacao: localizacao || '',
        diaInteiro: diaInteiro || false,
        idTipoEventoAgenda: type.id || null,
        idsMovProcessosVinculados: [
          {
            idMovProcessoCliente: movement.idMovProcessoCliente,
          },
        ],
      },
    ];

    dispatch(DeadlinesActions.deadlinesAdd(itens));

    setTimeout(() => closeModal(), 500);

    // resetValues();
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

  const checkRequiredFields = useCallback(
    fields => {
      let hasErrors = false;

      Object.keys(requiredFields).map(field => {
        const value = fields[field];
        let isValid = false;

        if (field === 'titulo') {
          // Título precisa ter pelo menos 2 caracteres
          isValid = value && typeof value === 'string' && value.length >= 2;
        } else if (field === 'data') {
          // Data precisa existir e ter conteúdo
          isValid =
            value && (typeof value === 'string' ? value.length > 0 : true);
        } else if (field === 'hora') {
          // Hora precisa existir e ter formato válido (HH:mm)
          isValid = value && typeof value === 'string' && value.length >= 5;
        }

        // Marca o erro se não for válido
        requiredFields[field](!isValid);

        if (!isValid) hasErrors = true;
      });

      return hasErrors;
    },
    [requiredFields],
  );

  const handleRequiredFields = useCallback(allDay => {
    if (allDay)
      setRequiredFields({ titulo: setTitleError, data: setDateError });
    else
      setRequiredFields({
        titulo: setTitleError,
        data: setDateError,
        hora: setHourError,
      });
  }, []);

  return (
    <Modal
      ref={ref}
      title="Cadastrar prazo"
      footer={footer()}
      onClose={resetValues}
    >
      <Content>
        <Row error={titleErr}>
          <Label>Título</Label>
          <Controller
            name="titulo"
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <Input
                value={title}
                ref={titleRef}
                error={titleErr}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nome do prazo"
                placeholderTextColor={titleErr ? colors.red : colors.grayLight}
                returnKeyType="next"
                onChangeText={text => {
                  setTitle(text);
                  setTitleError(text.length < 2); // Atualiza o erro em tempo real
                  if (onChange && typeof onChange === 'function') {
                    onChange(text);
                  }
                }}
                onBlur={() => {
                  // Valida quando o campo perde o foco
                  setTitleError(title.length < 2);
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
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <ReadBox>
                <MarkAsRead>
                  <MarkAsReadText
                    onPress={() => {
                      const newValue = !allDay;
                      setAllDay(newValue);
                      handleRequiredFields(newValue);
                      if (onChange && typeof onChange === 'function') {
                        onChange(newValue);
                      }
                    }}
                  >
                    Marcar como o dia todo
                  </MarkAsReadText>
                </MarkAsRead>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    const newValue = !allDay;
                    setAllDay(newValue);
                    handleRequiredFields(newValue);
                    if (onChange && typeof onChange === 'function') {
                      onChange(newValue);
                    }
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <CheckBox
                    lineWidth={1.5}
                    boxType={'square'}
                    value={allDay}
                    onValueChange={newValue => {
                      setAllDay(newValue);
                      handleRequiredFields(newValue);
                      if (onChange && typeof onChange === 'function') {
                        onChange(newValue);
                      }
                    }}
                    animationDuration={0.2}
                    tintColor={colors.primary}
                    onCheckColor={colors.white}
                    onFillColor={colors.primary}
                    onTintColor={colors.primary}
                    tintColors={{ true: colors.primary }}
                    style={{ width: 18, height: 18, marginRight: 12 }}
                    disabled={false}
                  />
                </TouchableOpacity>
              </ReadBox>
            )}
          />
        </Row>
        <Row error={dateErr}>
          <Label>Data</Label>
          <Controller
            name="data"
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <Datepicker
                date={date}
                enabled={true}
                error={dateErr}
                title="Selecione uma data"
                style={{
                  flexGrow: 1,
                  maxWidth: 200,
                  height: 22,
                }}
                onDateChange={dateValue => {
                  setDate(dateValue);
                  setDateError(false); // Limpa o erro quando a data é selecionada
                  setValue('data', dateValue);
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
              render={({ onChange }) => (
                <Hour onPress={() => setViewPicker(true)}>
                  <HourText error={hourErr}>
                    {hour || 'Selecione um horário'}
                  </HourText>
                  <DateTimePickerModal
                    mode="time"
                    locale="en_GB"
                    isVisible={viewPicker}
                    onConfirm={date => {
                      const hourValue = handleConfirm(date);
                      if (onChange && typeof onChange === 'function') {
                        onChange(hourValue);
                      }
                    }}
                    onCancel={hidePicker}
                    headerTextIOS="Selecione um horário"
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
            render={({ onChange }) => (
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
                  if (onChange && typeof onChange === 'function') {
                    onChange(text);
                  }
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
              render={({ onChange }) => (
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
                    setObservationError(text.length < 2);
                    if (onChange && typeof onChange === 'function') {
                      onChange(text);
                    }
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
