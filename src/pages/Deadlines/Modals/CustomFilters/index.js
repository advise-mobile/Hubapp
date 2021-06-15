import React, { forwardRef, useState, useCallback } from 'react';

import { FormatDateBR, FormatFinalDateEN, FormatInitialDateEN } from 'helpers/DateFunctions';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import Datepicker from 'components/DatePicker';

import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';

import { fonts, colors } from 'assets/styles';
import {
  Footer,
  Cancel,
  CancelText,
  Submit,
  SubmitText,
  Content,
  Row,
  Label,
  Badges,
  Badge,
  BadgeText,
  Column,
  Title,
  FormControl,
} from './styles';

export default CustomFilters = forwardRef((props, ref) => {
  const { control, handleSubmit } = useForm();

  const types = useSelector(state => state.deadlines.types);
  const loadingTypes = useSelector(state => state.deadlines.loadingTypes);
  const processing = useSelector(state => state.deadlines.processing);

  const [minDate, setMinDate] = useState(props.filters.dataInicial ? FormatDateBR(props.filters.dataInicial) : null);
  const [maxDate, setMaxDate] = useState(props.filters.dataFinal ? FormatDateBR(props.filters.dataFinal) : null);

  const [currentType, setCurrentType] = useState(props.filters.tipo || null);

  const removeNull = useCallback(object => {
    let removed = {};

    Object.keys(object).map(key => {
      if (object[key])
        removed[key] = object[key];
    });

    return removed;
  }, []);

  const countFilters = useCallback(() => [minDate, maxDate, currentType].filter(state => state != null).length, [minDate, maxDate, currentType]);

  // const checkNull = useCallback(states => states.filter(state => state != null).length);

  const clearFilters = useCallback(() => {
    setMinDate(null);
    setMaxDate(null);
    setCurrentType(null);

    // props.clear();
  }, []);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const onSubmit = data => {
    props.setFilters(removeNull({ ...data, idTipoEventoAgenda: currentType }));

    setTimeout(() => closeModal(), 300);
  };

  const renderTypes = useCallback(() => types.map((type, index) =>
    <Badge key={index} active={type.id == currentType} onPress={() => (type.id == currentType) ? setCurrentType(null) : setCurrentType(type.id)}>
      <BadgeText active={type.id == currentType}>{type.nome}</BadgeText>
    </Badge>
  ), [types, currentType]);

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
    <Modal ref={ref} title="Filtros" footer={footer()} filters={countFilters()} clear={clearFilters}>
      <Content>
        <Row>
          <Title>Período</Title>
          <FormControl>
            <Column>
              <Label>De</Label>
              <Controller
                name="dataInicial"
                control={control}
                defaultValue={null}
                render={({ onChange }) => (
                  <Datepicker
                    date={minDate}
                    enabled={true}
                    customStyles={DateStyle}
                    title="dd/mm/aaaa"
                    style={{ maxWidth: 100 }}
                    maxDate={maxDate || undefined}
                    onDateChange={date => { setMinDate(date), onChange(FormatInitialDateEN(date)) }}
                  />
                )}>
              </Controller>
            </Column>
            <Column>
              <Label>Até</Label>
              <Controller
                name="dataFinal"
                control={control}
                defaultValue={null}
                render={({ onChange }) => (
                  <Datepicker
                    date={maxDate}
                    enabled={true}
                    customStyles={DateStyle}
                    title="dd/mm/aaaa"
                    style={{ maxWidth: 100 }}
                    minDate={minDate || undefined}
                    onDateChange={date => { setMaxDate(date), onChange(FormatFinalDateEN(date)) }}
                  />
                )}>
              </Controller>
            </Column>
          </FormControl>
        </Row>
        <Row>
          <Column>
            <Title>Tipo de Prazo</Title>
            <Badges>
              {loadingTypes ? <Spinner /> : renderTypes()}
            </Badges>
          </Column>
        </Row>
      </Content>
    </Modal >
  );
});


const DateStyle = {
  dateInput: {
    flex: 1,
    marginTop: 2,
    height: 20,
    paddingBottom: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLighter,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  disabled: {
    backgroundColor: colors.white,
  },
  dateText: {
    marginTop: 2,
    fontSize: 16,
    color: colors.grayDarker,
    fontFamily: fonts.circularStdBook,
  }
};
