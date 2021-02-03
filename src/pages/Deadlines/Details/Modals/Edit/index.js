import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import { FormatFullDateEN } from 'helpers/DateFunctions';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Datepicker from 'components/DatePicker';

import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from 'store/ducks/Deadlines';

import { colors } from 'assets/styles';
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

export default Edit = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

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
  const [hour, setHour] = useState(moment().format('hh:mm'));
  const [idAgenda, setIdAgenda] = useState(null);
  const [location, setLocation] = useState('');
  const [observation, setObservation] = useState('');
  // Errors
  const [titleErr, setTitleError] = useState(false);
  const [locationErr, setLocationError] = useState(false);
  const [observationErr, setObservationError] = useState(false);
  const [typesErr, setTypesErr] = useState(false);
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

    setTitle(props.deadline?.titulo || '');
    setCurrentType(props.deadline?.idTipoEventoAgenda || 0);
    setAllDay(props.deadline?.diaInteiro || false);
    setDate(moment(props.deadline?.dataHoraInicio).format('DD/MM/YYYY') || new Date());
    setIdAgenda(props.deadline?.idAgenda || 0);
    setHour(props.deadline?.horaFormatada || '00:00');
    setLocation(props.deadline?.localizacao || '');
    setObservation(props.deadline?.observacao || '');

    setDefaultValues({
      titulo: props.deadline?.titulo || '',
      diaInteiro: props.deadline?.diaInteiro || false,
      data: moment(props.deadline?.dataHoraInicio).format('DD/MM/YYYY') || new Date(),
      hora: props.deadline?.horaFormatada || '00:00',
      localizacao: props.deadline?.localizacao || '',
      observacao: props.deadline?.observacao || '',
    });

  }, [props]);

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
    // setIdAgenda(props.idAgenda);
    setHour(moment().format('hh:mm'));

    // reset(defaultValues);
  }, []);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const onSubmit = ({ titulo, idAgenda, data, hora, observacao, localizacao, diaInteiro }) => {

    if (!currentType) {
      setTypesErr(true);

      return;
    }

    const dataHoraInicio = `${moment(data || new Date()).format('YYYY-MM-DD')}T${diaInteiro ? '09:30' : hora || hour}:00`;

    const dataHoraFim = diaInteiro ? moment(dataHoraInicio).format('YYYY-MM-DDT23:59:00') : moment(dataHoraInicio).add(1, 'hours').format('YYYY-MM-DDTH:mm:ss');

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
      diaInteiro: diaInteiro || false,
      idTipoEventoAgenda: type.id || null,
    };

    let values = {};

    Object.keys(allValues).map(key => {
      if (allValues[key]) {
        values[key] = allValues[key];
      }
    });

    const itens = [{ ...deadline, ...values }];

    dispatch(DeadlinesActions.deadlinesEdit(itens));

    props.onFishEdit(itens[0]);

    setTimeout(() => closeModal(), 500);

    resetValues();
  };


  const renderTypes = useCallback(() => types.map((type, index) =>
    <Badge key={index} active={type.id == currentType} onPress={() => { setCurrentType(type.id); setTypesErr(false) }} error={typesErr}>
      <BadgeText active={type.id == currentType} error={typesErr}>{type.nome}</BadgeText>
    </Badge>
  ), [types, currentType, typesErr]);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
      <Submit onPress={handleSubmit(onSubmit)} disabled={processing} >
        {processing ? <Spinner transparent={true} color={colors.white} height='auto' /> : <SubmitText>Salvar</SubmitText>}
      </Submit>
    </Footer>
  );

  return (
    <Modal ref={ref} title="Editar prazo" footer={footer()}>
      <Content>
        <Row>
          <Label>Título</Label>
          <Controller
            name='titulo'
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <Input
                value={title}
                ref={titleRef}
                error={titleErr}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Nome do prazo'
                placeholderTextColor={colors.grayLight}
                returnKeyType='next'
                onChangeText={text => {
                  setTitle(text);
                  setTitleError(title.length < 2);
                  onChange(text);
                }}
              />
            )}>
          </Controller>
        </Row>
        <Row>
          <Label>Tipo</Label>
          <Badges>
            {loadingTypes ? <Spinner /> : renderTypes()}
          </Badges>
        </Row>
        <Row>
          <Controller
            name='diaInteiro'
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <ReadBox>
                <MarkAsRead>
                  <MarkAsReadText onPress={() => setAllDay(!allDay)}>Marcar como o dia todo</MarkAsReadText>
                </MarkAsRead>
                <CheckBox
                  lineWidth={1.5}
                  boxType={'square'}
                  value={allDay}
                  onValueChange={newValue => { setAllDay(newValue); onChange(newValue) }}
                  animationDuration={0.2}
                  tintColor={colors.primary}
                  onCheckColor={colors.white}
                  onFillColor={colors.primary}
                  onTintColor={colors.primary}
                  tintColors={{ true: colors.primary }}
                  style={{ width: 18, height: 18, marginRight: 12 }}
                />
              </ReadBox>
            )}>
          </Controller>
        </Row>
        <Row>
          <Label>Data</Label>
          <Controller
            name='data'
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <Datepicker
                date={date}
                enabled={true}
                title="dd/mm/yyyy"
                style={{
                  flexGrow: 1,
                  maxWidth: 200,
                  height: 22
                }}
                customStyles={DateStyle}
                onDateChange={date => { setDate(date), onChange(FormatFullDateEN(date)) }}
              />
            )}>
          </Controller>
        </Row>
        {!allDay &&
          <Row>
            <Label>Hora</Label>
            <Controller
              name='hora'
              control={control}
              defaultValue={null}
              rules={{ required: false }}
              render={({ onChange }) => (
                <Hour onPress={() => setViewPicker(true)}>
                  <HourText>{hour}</HourText>
                  <DateTimePickerModal
                    mode='time'
                    locale='en_GB'
                    isVisible={viewPicker}
                    onConfirm={date => onChange(handleConfirm(date))}
                    onCancel={hidePicker}
                    headerTextIOS='Selecione uma data'
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                  />
                </Hour>
              )}>
            </Controller>
          </Row>
        }
        <Row>
          <Label>Localização</Label>
          <Controller
            name='localizacao'
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <Input
                value={location}
                ref={locationRef}
                error={locationErr}
                autoCorrect={false}
                autoCapitalize='none'
                placeholder='Digite uma localização'
                placeholderTextColor={colors.grayLight}
                returnKeyType='next'
                onChangeText={text => {
                  setLocation(text);
                  setLocationError(location.length < 2);
                  onChange(text);
                }}
              />
            )}>
          </Controller>
        </Row>
        <Row>
          <Column>
            <Label>Observações</Label>
            <Controller
              name='observacao'
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
                  autoCapitalize='none'
                  placeholder='Digite uma observação'
                  placeholderTextColor={colors.grayLight}
                  returnKeyType='next'
                  onChangeText={text => {
                    setObservation(text);
                    onChange(text);
                  }}
                />
              )}>
            </Controller>
          </Column>
        </Row>
      </Content>
    </Modal >
  );
});
