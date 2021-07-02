import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import Modal from 'components/Modal';
import Datepicker from 'components/DatePicker';

import { FormatFullDateEN, FormatDateBR } from 'helpers/DateFunctions';

import { colors, fonts } from 'assets/styles';
import {
  Title,
  Label,
  Row,
  Column,
  Submit,
  SubmitText,
  RBRow,
  RBLabel
} from "./styles";

export default Filters = forwardRef((props, ref) => {
  const { control, handleSubmit } = useForm();
  const [situation, setSituation] = useState(props.filters.Lido || 0);
  const [customField, setCustomFields] = useState(props.customField);
  const [minDate, setMinDate] = useState(props.filters.DataMovimentoInicio ? FormatDateBR(props.filters.DataMovimentoInicio) : null);
  const [maxDate, setMaxDate] = useState(props.filters.DataMovimentoFim ? FormatDateBR(props.filters.DataMovimentoFim) : null);
  const [selectedCustom, setSelectedCustom] = useState(props.filters[customField?.name] || 0);

  const countFilters = useCallback(() => checkNull([situation, minDate, maxDate, selectedCustom]), [situation, minDate, maxDate, selectedCustom]);

  const checkNull = useCallback(states => states.filter(state => (state != null && state != 0)).length);

  useEffect(() => {
    setSituation(props.filters.Lido || 0);
    setCustomFields(props.customField);
    setMinDate(props.filters.DataMovimentoInicio ? FormatDateBR(props.filters.DataMovimentoInicio) : null);
    setMaxDate(props.filters.DataMovimentoFim ? FormatDateBR(props.filters.DataMovimentoFim) : null);
    setSelectedCustom(props.filters[customField?.name] || 0);
  }, [props]);

  const clearFilters = useCallback(() => {
    setSituation(0);
    setSelectedCustom(0);
    setMinDate(null);
    setMaxDate(null);
  }, []);

  const onSubmit = data => {
    ref.current?.close();

    // console.log({
    //   "DataMovimentoFim": data.DataMovimentoFim || maxDate ? FormatFullDateEN(maxDate) : null,
    //   "DataMovimentoInicio": data.DataMovimentoInicio || minDate ? FormatFullDateEN(minDate) : null,
    //   "Lido": situation,
    //   "diario": data[props.filters[customField?.name]] || selectedCustom
    // });

    if (customField) {

      const submit = {
        "DataMovimentoFim": data.DataMovimentoFim || maxDate ? FormatFullDateEN(maxDate) : null,
        "DataMovimentoInicio": data.DataMovimentoInicio || minDate ? FormatFullDateEN(minDate) : null,
        "Lido": radio_props[situation].value
      };

      submit[customField.name] = data[props.filters[customField?.name]] || selectedCustom;

      setTimeout(() => props.submit(submit), 500);

    } else {
      setTimeout(() => props.submit({
        "DataMovimentoFim": data.DataMovimentoFim || maxDate ? FormatFullDateEN(maxDate) : null,
        "DataMovimentoInicio": data.DataMovimentoInicio || minDate ? FormatFullDateEN(minDate) : null,
        "Lido": radio_props[situation].value
      }), 500);
    }
  };

  const radio_props = [
    { label: 'Todas as situações', value: null },
    { label: 'Lidas', value: true },
    { label: 'Não lidas', value: false },
  ];

  const renderCustomFields = () => {
    if (Object.keys(customField).length < 1) return;

    const defaultField = {
      label: `Todos os ${customField.title.toLowerCase()}`,
      value: null
    };

    const data = customField.data.map(item => {
      return {
        label: item.nome,
        value: item.id
      }
    });

    return (
      <>
        <Row>
          <Title>{customField.title}</Title>
        </Row>
        <Row>
          <Controller
            name={customField.name}
            control={control}
            defaultValue={null}
            rules={{ required: customField.required || false }}
            render={({ onChange }) => (
              <Column>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={value => { setSelectedCustom(value); onChange(value); }}
                  placeholder={{}}
                  doneText="Selecionar"
                  value={selectedCustom}
                  items={[defaultField, ...data]}
                  Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
                />
              </Column>
            )}>
          </Controller>
        </Row>
      </>
    );
  };

  const footer = () => (
    <Submit onPress={handleSubmit(onSubmit)}>
      <SubmitText>Ver resultados</SubmitText>
    </Submit>
  );

  return (
    <Modal ref={ref} footer={footer()} title="Filtros" filters={countFilters()} clear={clearFilters}>
      <Row>
        <Title>Período</Title>
      </Row>
      <Row>
        <Column>
          <Label>De</Label>
          <Controller
            name="DataMovimentoInicio"
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
                onDateChange={date => { setMinDate(date), onChange(FormatFullDateEN(date)) }}
              />
            )}>
          </Controller>
        </Column>
        <Column>
          <Label>Até</Label>
          <Controller
            name="DataMovimentoFim"
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
                onDateChange={date => { setMaxDate(date), onChange(FormatFullDateEN(date)) }}
              />
            )}>
          </Controller>
        </Column>
      </Row>
      <Row>
        <Title>Situação</Title>
      </Row>
      <Row>
        <Controller
          name="Lido"
          control={control}
          defaultValue={null}
          render={({ onChange }) => (
            <RadioForm animation={true} style={{ flex: 1 }}>
              {
                radio_props.map((obj, i) => (
                  <RBRow as={RadioButton} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      isSelected={situation == i}
                      onPress={value => {
                        setSituation(i);
                        onChange(value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={colors.primary}
                      buttonOuterColor={colors.primary}
                      buttonSize={12}
                      buttonOuterSize={18}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      labelStyle={RBLabel.label}
                      onPress={value => {
                        setSituation(i);
                        onChange(value);
                      }}
                    />
                  </RBRow>
                ))
              }
            </RadioForm>
          )}>
        </Controller>
      </Row>
      {renderCustomFields()}
    </Modal>
  );
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // minWidth: 350,
    flex: 1,
    color: colors.fadedBlack,
    fontFamily: fonts.circularStdBook,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLighter,
  },
  inputAndroid: {
    height: 20,
    fontSize: 16,
    color: colors.fadedBlack,
    fontFamily: fonts.circularStdBook,
    // minWidth: 350,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLighter,
  },
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
