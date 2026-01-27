import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import Modal from '@lcomponents/Modal';
import Datepicker from '@lcomponents/DatePicker';

import { FormatFullDateEN, FormatDateEN } from '@lhelpers/DateFunctions';
import moment from 'moment';

import { fonts } from '@lassets/styles';
import { Title, Label, Row, Column, Submit, SubmitText, RBRow } from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const Filters = forwardRef((props, ref) => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const { control, handleSubmit, setValue } = useForm();
  const [situation, setSituation] = useState(props.filters.Lido || 0);
  const [customField, setCustomFields] = useState(props.customField);
  const [minDate, setMinDate] = useState(
    props.filters.DataMovimentoInicio
      ? new Date(props.filters.DataMovimentoInicio)
      : undefined,
  );
  const [maxDate, setMaxDate] = useState(
    props.filters.DataMovimentoFim
      ? new Date(props.filters.DataMovimentoFim)
      : undefined,
  );
  const [selectedCustom, setSelectedCustom] = useState(
    props.filters[customField?.name] || 0,
  );

  const countFilters = useCallback(
    () => checkNull([situation, minDate, maxDate, selectedCustom]),
    [situation, minDate, maxDate, selectedCustom],
  );

  const checkNull = useCallback(
    states => states.filter(state => state != null && state != 0).length,
  );

  useEffect(() => {
    const newMinDate = props.filters.DataMovimentoInicio
      ? new Date(props.filters.DataMovimentoInicio)
      : undefined;

    const newMaxDate = props.filters.DataMovimentoFim
      ? new Date(props.filters.DataMovimentoFim)
      : undefined;

    const newSelectedCustom =
      props.filters[customField?.name]?.length > 0
        ? props.filters[customField?.name][0]
        : 0;

    const newSelectedCustomValue =
      props.filters[customField?.name]?.length > 0
        ? props.filters[customField?.name][0]
        : 0;
    setSituation(props.filters.Lido || 0);
    setCustomFields(props.customField);
    setMinDate(newMinDate);
    setMaxDate(newMaxDate);
    setSelectedCustom(newSelectedCustom);
    setValue(customField?.name, newSelectedCustomValue);
  }, [
    props.filters.DataMovimentoInicio,
    props.filters.DataMovimentoFim,
    props.filters.Lido,
    props.customField,
    customField?.name,
  ]);

  const clearFilters = useCallback(() => {
    setSituation(0);
    setSelectedCustom(0);
    setMinDate(undefined);
    setMaxDate(undefined);
    setValue('DataMovimentoInicio', null);
    setValue('DataMovimentoFim', null);
    setValue('Lido', null);
  }, [setValue]);

  const onSubmit = data => {
    ref.current?.close();

    if (customField) {
      const submit = {
        DataMovimentoFim: data.DataMovimentoFim
          ? FormatFullDateEN(data.DataMovimentoFim)
          : null,
        DataMovimentoInicio: data.DataMovimentoInicio
          ? FormatFullDateEN(data.DataMovimentoInicio)
          : null,
        Lido: radio_props[situation].value,
      };

      submit[customField.name] = data[customField.name] || null;

      setTimeout(() => props.submit(submit), 500);
    } else {
      setTimeout(
        () =>
          props.submit({
            DataMovimentoFim:
              data.DataMovimentoFim || maxDate
                ? FormatFullDateEN(maxDate)
                : null,
            DataMovimentoInicio:
              data.DataMovimentoInicio || minDate
                ? FormatFullDateEN(minDate)
                : null,
            Lido: radio_props[situation].value,
          }),
        500,
      );
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
      value: '',
    };

    const data = customField.data.map(item => {
      return {
        label: item.nome,
        value: item.id,
      };
    });

    const pickerSelectStyles = stylePickerSelectStyles(colors);

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
            render={({ field }) => (
              <Column>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={value => {
                    setSelectedCustom(value);
                    setValue(customField.name, value);
                    field.onChange(value);
                  }}
                  placeholder={{}}
                  doneText="Selecionar"
                  value={
                    selectedCustom !== null && selectedCustom !== undefined
                      ? selectedCustom
                      : ''
                  }
                  items={[defaultField, ...data]}
                  useNativeAndroidPickerStyle={
                    Platform.OS === 'android' ? false : undefined
                  }
                  fixAndroidTouchableBug={Platform.OS === 'android'}
                  touchableWrapperProps={
                    Platform.OS === 'android'
                      ? {
                          activeOpacity: 0.7,
                          hitSlop: { top: 30, bottom: 30, left: 30, right: 30 },
                        }
                      : undefined
                  }
                  Icon={() =>
                    Platform.OS === 'android' ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                        style={{
                          padding: 10,
                        }}
                      >
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={18}
                          color="gray"
                        />
                      </TouchableOpacity>
                    ) : (
                      <MaterialIcons
                        name="arrow-drop-down"
                        size={18}
                        color="gray"
                      />
                    )
                  }
                />
              </Column>
            )}
          />
        </Row>
      </>
    );
  };

  const footer = () => (
    <Submit onPress={handleSubmit(onSubmit)}>
      <SubmitText>Ver resultados</SubmitText>
    </Submit>
  );

  const RBLabel = stylesRBLabel(colors);

  return (
    <Modal
      ref={ref}
      footer={footer()}
      title="Filtros"
      filters={countFilters()}
      clear={clearFilters}
    >
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
            render={({ field }) => (
              <Datepicker
                date={minDate}
                enabled={true}
                //customStyles={DateStyle}
                title="dd/mm/aaaa"
                style={{ maxWidth: 100 }}
                maxDate={maxDate || undefined}
                onDateChange={date => {
                  setMinDate(date);
                  setValue('DataMovimentoInicio', date);
                  field.onChange(date);
                }}
              />
            )}
          />
        </Column>
        <Column>
          <Label>Até</Label>
          <Controller
            name="DataMovimentoFim"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Datepicker
                date={maxDate}
                enabled={true}
                // customStyles={DateStyle}
                title="dd/mm/aaaa"
                style={{ maxWidth: 100 }}
                minDate={minDate || undefined}
                onDateChange={date => {
                  setMaxDate(date);
                  setValue('DataMovimentoFim', date);
                  field.onChange(date);
                }}
              />
            )}
          />
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
          render={({ field }) => (
            <RadioForm animation={true} style={{ flex: 1 }}>
              {radio_props.map((obj, i) => (
                <RBRow as={RadioButton} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    isSelected={situation == i}
                    onPress={value => {
                      setSituation(i);
                      setValue('Lido', value);
                      field.onChange(value);
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
                      setValue('Lido', value);
                    }}
                  />
                </RBRow>
              ))}
            </RadioForm>
          )}
        />
      </Row>
      {renderCustomFields()}
    </Modal>
  );
});

export default Filters;

const stylePickerSelectStyles = colors => {
  const baseStyles = {
    inputIOS: {
      fontSize: 16,
      flex: 1,
      color: colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
      borderBottomWidth: 1,
      borderBottomColor: colors.grayLighter,
    },
    inputAndroid: {
      height: 40,
      fontSize: 16,
      color: colors.grayDarker,
      fontFamily: fonts.circularStdBook,
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: colors.grayLighter,
      paddingVertical: 10,
      paddingHorizontal: 0,
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
  };

  if (Platform.OS === 'android') {
    baseStyles.chevronContainer = {
      display: 'none',
    };
    baseStyles.chevron = {
      display: 'none',
    };
  }

  return StyleSheet.create(baseStyles);
};

const stylesRBLabel = colors =>
  StyleSheet.create({
    label: {
      color: colors.grayDarker,
      fontFamily: fonts.circularStdBook,
      fontSize: fonts.regular,
    },
  });
