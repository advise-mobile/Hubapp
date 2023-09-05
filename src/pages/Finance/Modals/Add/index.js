import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import { FormatFullDateEN } from 'helpers/DateFunctions';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Datepicker from 'components/DatePicker';

import { useForm, Controller, reset } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';

import DeadlinesActions from 'store/ducks/Deadlines';

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

export default Add = forwardRef((props, ref) => {

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const types = useSelector(state => state.deadlines.types);
  const loadingTypes = useSelector(state => state.deadlines.loadingTypes);
  const processing = useSelector(state => state.deadlines.processing);


  //Refs
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const observationRef = useRef(null);
  //Data
  const [title, setTitle] = useState('');
  const [currentType, setCurrentType] = useState(null);
  const [allDay, setAllDay] = useState(false);
  const [date, setDate] = useState(null);
  const [idAgenda, setIdAgenda] = useState(props.idAgenda);
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
    'titulo': setTitleError,
    'data': setDateError,
    'hora': setHourError
  });

  const onAdd = props.onAdd;

  const hidePicker = () => setViewPicker(false);

  // const defaultValues = {
  //   titulo: '',
  //   diaInteiro: false,
  //   data: props.date || new Date(),
  //   hora: moment().format('hh:mm'),
  //   localizacao: '',
  //   observacao: '',
  // }

  useEffect(() => setIdAgenda(props.idAgenda), [props]);

  const handleConfirm = date => {
    const hour = moment(date).format('HH:mm');

    setHour(hour);

    setHourError(hour.length < 2);

    hidePicker();

    return hour;
  };

  const resetValues = useCallback(() => {
    setTitle('');
    setLocation('');
    setObservation('');
    setAllDay(false);
    setCurrentType(null);
    setDate(null);
    setHour(null);

    setTitleError(false);
    setDateError(false);
    setHourError(false);
    // reset(defaultValues);
  }, []);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const onSubmit = ({ titulo, observacao, localizacao, data, hora, diaInteiro }) => {

    const hasErrors = checkRequiredFields({ titulo, data, hora });

    setTypesErr(!currentType);

    if (!currentType || hasErrors) return;

    const dataHoraInicio = `${moment(data || new Date()).format('YYYY-MM-DD')}T${diaInteiro ? '09:30' : hora || hour}:00`;

    const dataHoraFim = diaInteiro ? moment(dataHoraInicio).format('YYYY-MM-DDT23:59:00') : moment(dataHoraInicio).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');

    const type = types.find(type => type.id == currentType);

    if (!type) {
      setTypesErr(true);

      return;
    }

    const itens = [{
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
    }];

    dispatch(DeadlinesActions.deadlinesAdd(itens));

    setTimeout(() => closeModal(), 500);
    setTimeout(() => onAdd(), 1000);

    // resetValues();
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

  const checkRequiredFields = useCallback(fields => {
    let hasErrors = false;

    Object.keys(requiredFields).map(field => {
      requiredFields[field](fields[field] < 2);

      if (fields[field] < 2) hasErrors = true;
    });

    return hasErrors;
  }, [requiredFields]);

  const handleRequiredFields = useCallback((allDay) => {
    if (allDay)
      setRequiredFields({ 'titulo': setTitleError, 'data': setDateError });
    else
      setRequiredFields({ 'titulo': setTitleError, 'data': setDateError, 'hora': setHourError });
  }, []);

  return (
    <Modal ref={ref} title="Cadastrar" footer={footer()} onClose={resetValues}>
      <Content>
        <Row error={titleErr}>
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
                placeholderTextColor={titleErr ? colors.red : colors.grayLight}
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
                  onValueChange={newValue => { setAllDay(newValue); handleRequiredFields(newValue); onChange(newValue) }}
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
        <Row error={dateErr}>
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
                error={dateErr}
                title="Selecione uma data"
                style={{
                  flexGrow: 1,
                  maxWidth: 200,
                  height: 22
                }}
                onDateChange={date => { setDate(date); setDateError(date.length > 0); onChange(FormatFullDateEN(date)) }}
              />
            )}>
          </Controller>
        </Row>
        {!allDay &&
          <Row error={hourErr}>
            <Label>Hora</Label>
            <Controller
              name='hora'
              control={control}
              defaultValue={null}
              rules={{ required: false }}
              render={({ onChange }) => (
                <Hour onPress={() => setViewPicker(true)}>
                  <HourText error={hourErr}>{hour || 'Selecione um horário'}</HourText>
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
                    setObservationError(observation.length < 2);
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
