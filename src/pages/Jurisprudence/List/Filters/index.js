import React, { forwardRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';

import { colors, fonts } from 'assets/styles';
import {
  Title,
  Row,
  Submit,
  SubmitText,
} from "./styles";

export default Filters = forwardRef((props, ref) => {
  const { control, handleSubmit, setValue, getValues } = useForm();
  const [data, setData] = useState(props.data);
  const [selectedTypeLabel, setSelectedTypeLabel] = useState();
  const [selectedType, setSelectedType] = useState(props.filters.all);
  const [selectedYear, setSelectedYear] = useState(props.filters.ano);
  const [selectedArea, setSelectedArea] = useState(props.filters.grupo);
  const [selectedQuote, setSelectedQuote] = useState(props.filters.integra);
  const [selectedTribunal, setSelectedTribunal] = useState(props.filters.tribunal);

  useEffect(() => {
    setValue("all", selectedType);
    setValue("ano", selectedYear);
    setValue("grupo", selectedArea);
    setValue("integra", selectedQuote);
    setValue("tribunal", selectedTribunal);
    setData(props.data);
  }, [props]);

  const onSubmit = data => {
    ref.current?.close();

    setTimeout(() => props.submit(data), 500);
  };

  const footer = () => (
    <Submit onPress={handleSubmit(onSubmit)}>
      <SubmitText>Ver resultados</SubmitText>
    </Submit>
  );

  return (
    <Modal ref={ref} footer={footer()} title="Filtros">
      <Row>
        <Title>Ano</Title>
        <Controller
          name='ano'
          control={control}
          defaultValue={null}
          rules={{ required: false }}
          render={({ onChange }) => (
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => { setSelectedYear(value); onChange(value); }}
              placeholder={{}}
              doneText="Selecionar"
              value={selectedYear}
              items={data.years}
              Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
            />
          )}>
        </Controller>
      </Row>
      <Row>
        <Title>Tipos de Tribunais</Title>
        <Controller
          name='all'
          control={control}
          defaultValue={null}
          rules={{ required: false }}
          render={({ onChange }) => (
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value, index) => { setSelectedTypeLabel(data.types[index]); setSelectedType(value); onChange(value); }}
              placeholder={{}}
              doneText="Selecionar"
              value={selectedType}
              items={data.types}
              Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
            />
          )}>
        </Controller>
      </Row>
      {selectedType &&
        <Row>
          <Title>Tribunais</Title>
          <Controller
            name='tribunal'
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ onChange }) => (
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={value => { setSelectedTribunal(value); onChange(value); }}
                placeholder={{}}
                doneText="Selecionar"
                value={selectedTribunal}
                items={data.tribunals.filter(tribunal => tribunal.type == selectedTypeLabel?.label.toLowerCase() || tribunal.type == null)}
                Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
              />
            )}>
          </Controller>
        </Row>
      }
      <Row>
        <Title>Áreas</Title>
        <Controller
          name='grupo'
          control={control}
          defaultValue={null}
          rules={{ required: false }}
          render={({ onChange }) => (
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => { setSelectedArea(value); onChange(value); }}
              placeholder={{}}
              doneText="Selecionar"
              value={selectedArea}
              items={data.groups}
              Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
            />
          )}>
        </Controller>
      </Row>
      <Row>
        <Title>Parciais e íntegras</Title>
        <Controller
          name='integra'
          control={control}
          defaultValue={null}
          rules={{ required: false }}
          render={({ onChange }) => (
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={value => { setSelectedQuote(value); onChange(value); }}
              placeholder={{}}
              doneText="Selecionar"
              value={selectedQuote}
              items={data.quotes}
              Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
            />
          )}>
        </Controller>
      </Row>
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
