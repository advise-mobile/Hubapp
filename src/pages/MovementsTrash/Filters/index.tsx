import React, { forwardRef, useState, useCallback, useEffect, Ref } from 'react';

import { StyleSheet } from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';
import Spinner from '@components/Spinner';
import  MultiSelectCheckBox from '@components/MultiSelectCheckBox'

import { FormatFullDateEN } from '@helpers/DateFunctions';

import { ItemProps } from '@components/MultiSelectCheckBox/types';

import { fonts } from 'assets/styles';

import {
  Title,
  Label,
  Row,
  Column,
  Submit,
  SubmitText,
  RBRow,
  SpaceRow,
  ContainerSubtitle,
  SubTitleMultiSelectText,
  ContainerMultiSelect,
  ContainerSituation,
  ContainerSpinner,
  ClearButtom,
  ClearButtomText
} from "./styles";

import { FilterProps, DataFilterProps } from './types';

import { useKeyWordsGet, useDiariesGet, useJournalsGet } from '@services/hooks/MovimentsTrash/useMovementsTrash';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Filters = forwardRef(({handleSubmitFilters}:FilterProps,ref) => {

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const  { colors }  = colorUseTheme;

  // - Key Words from hook called api
  const {dataKeyWords, loadingKeyWords} = useKeyWordsGet();

  // - Key Words states
  const [showKeyWordsAll, setKeyWordsAll] = useState<boolean>(true);
  const [keyWords, setKeyWords] = useState<ItemProps[]>();
  const [keyWordsCheckeds, setKeyWordsCheckeds] = useState<number[]>([]);
  const [showKeyWords, setShowKeyWords] = useState<boolean>(true);
  const [quantitySelected, setQuantitySelected] = useState<number>(0);
  const [startAllChecked, setStartAllChecked] = useState<boolean>(false);

  // - Diaries  states
  const [showDiaries, setShowDiaries] = useState<boolean>(false);
  const [quantityDiariesSelected, setQuantityDiariesSelected] = useState<number>(0);  
  const [dataDiaries, setDataDiaries] = useState<ItemProps[]>([]);
  const [dataDiariesCheckeds, setDataDiariesCheckeds] = useState<number[]>([]);

  // - Journals  states
  const [showJournals, setShowJournals] = useState<boolean>(false);
  const [quantityJournalsSelected, setQuantityJournalsSelected] = useState<number>(0);  
  const [dataJournals, setDataJournals] = useState<ItemProps[]>([]);
  const [dataJournalsCheckeds, setDataJournalsCheckeds] = useState<number[]>([]);

  const [situation, setSituation] = useState<number>(0);
  const [idTipoMovProcesso, setIdTipoMovProcesso] = useState<number|null>(null);
  const [minDate, setMinDate] = useState<string|null>(null);
  const [maxDate, setMaxDate] = useState<string|null>(null);


  const { control, handleSubmit, setValue, getValues } = useForm({
    shouldUnregister: false,
  });

  const onSubmit = (data:DataFilterProps) => {
    handleSubmitFilters(data);
  };
  
  const countFilters = useCallback(() => checkNull(
      [situation, minDate, maxDate, idTipoMovProcesso,keyWordsCheckeds,dataDiariesCheckeds,dataJournalsCheckeds]),
      [situation, minDate, maxDate, idTipoMovProcesso,keyWordsCheckeds,dataDiariesCheckeds,dataJournalsCheckeds]
    );

  const checkNull = useCallback(states => states.filter(state => (state != null && state != 0)).length,[]);

  const {isLoadingDiaries, diariesGet} = useDiariesGet();

  const {isLoadingJournals, journalsGet} = useJournalsGet();

  useEffect(() => {
    
    setKeyWords(dataKeyWords) 
    
    setQuantitySelected(startAllChecked ? dataKeyWords.length : 0)
    
    if(startAllChecked){
      const dataChecked = dataKeyWords.map((item:ItemProps) => {
        return item.id
      });

      setKeyWordsCheckeds( dataChecked); 
      setValue("idPalavraChave",dataChecked)
    }else{
      setKeyWordsCheckeds([]);
    }
    
  },[dataKeyWords]);

  // - monitora ação de buscar diarios
  useEffect(() => { 
  }, [isLoadingDiaries]);

  // - monitora ação de buscar cadernos
  useEffect(() => { 
  }, [isLoadingJournals]);
  

  const clearFilters = useCallback(() => {
    setSituation(0);
    setMinDate(null);
    setMaxDate(null);

    setValue("DataMovimentoInicio",null)
    setValue("DataMovimentoFim",null)

    setValue("idTipoMovProcesso",null)

    setValue("Lido",null)
    
    setIdTipoMovProcesso(null)

    // - reset diaries
    setDataDiariesCheckeds([])
    setQuantityDiariesSelected(0)
    setValue("idDiario",[])

    // - reset keywords
    setQuantitySelected(0)
    setKeyWordsCheckeds([]);   
    setValue("idPalavraChave",[])

    
    // - reset journals
    setDataJournalsCheckeds([])
    setQuantityDiariesSelected(0)
    setValue("idJournals",[])
  }, []);

  const renderTypesMovimentation = () => {
    
    const data = [
      {
        label: `Todas`,
        value: null
      },
      {
        label: `Publicações`,
        value: '-2'
      },
      {
        label: `Processos`,
        value: '-1'
      },    
    ];

    const pickerSelectStyles = stylePickerSelectStyles(colors);

    const onValidateType = (value:number) => {
      
      if(value === "-1"){

        // - reset keywords
        setQuantitySelected(0)
        setKeyWordsCheckeds([]);   
        setValue("idPalavraChave",[])
        setKeyWordsAll(false);

            // - reset diaries
        setDataDiariesCheckeds([])
        setQuantityDiariesSelected(0)
        setValue("idDiario",[])
        
        // - reset journals
        setDataJournalsCheckeds([])
        setQuantityDiariesSelected(0)
        setValue("idJournals",[])
      }else{
        setKeyWordsAll(true);
      }
    }

    return (
      <>
        <Row>
          <Title>Movimentações</Title>
        </Row>
        <Row>
          <Controller
            name="idTipoMovProcesso"
            control={control}
            defaultValue={null}
            render={({ onChange }) => (
              <Column>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  onValueChange={value => { 
                    setIdTipoMovProcesso(value);
                    onChange(value);
                    onValidateType(value);
                  }}
                  placeholder={{}}
                  doneText="Selecionar"
                  value={idTipoMovProcesso}
                  items={data}
                  Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
                />
              </Column>
            )}>
          </Controller>
        </Row>
      </>
    );
  };

  const renderKeyWords = useCallback(() => {

    const onChangeSelected = (data:Array<number>) => {
      
        setQuantitySelected(data.length)
        setKeyWordsCheckeds(data);   
        setValue("idPalavraChave",data)

        // - reset diaries
        setDataDiariesCheckeds([])
        setDataDiaries([])
        setQuantityDiariesSelected(0)
        setShowDiaries(false);
        setValue("idDiario",[])
   
        
    }

    
    return (
      <ContainerMultiSelect>
        <SpaceRow>  
          <Title>Palavras-chave</Title>
          <ClearButtom onPress={()=> onChangeSelected([])}><ClearButtomText>Limpar</ClearButtomText></ClearButtom>
        </SpaceRow>

        {
          loadingKeyWords ? (<Spinner	/>) : (
            <>
                <ContainerSubtitle onPress={() => setShowKeyWords(!showKeyWords)}>
                  <SpaceRow>  
                      <SubTitleMultiSelectText>{quantitySelected} Palavra-chave(s) selecionada(s)</SubTitleMultiSelectText>
                      <Label><MaterialIcons name="arrow-drop-down" size={18} color="gray" /></Label>
                  </SpaceRow>
                </ContainerSubtitle>
                { 
                  showKeyWords && 
              
                  <Row>
                    <Controller
                      name="idPalavraChave"
                      control={control}
                      defaultValue={[]}
                      render={() => (
                          <MultiSelectCheckBox  
                            data={keyWords}
                            dataCheckeds={keyWordsCheckeds}
                            onChangeSelected={onChangeSelected} 
                            />
                      )}>
                    </Controller>
                  </Row>
                }
              </>)
            }
      </ContainerMultiSelect>
    );
  },[keyWords,showKeyWords,quantitySelected, showKeyWordsAll]);

  const renderDiaries = useCallback(() => {

    const onChangeSelected = (data:Array<number>) => {
      
        setQuantityDiariesSelected(data.length)
        setDataDiariesCheckeds(data);   
        setValue("idDiario",data)

        // - reset journals
        setDataJournalsCheckeds([])
        setDataJournals([])
        setQuantityJournalsSelected(0)
        setShowJournals(false);
        setValue("idJournals",[])
    }

    const handleGetDiaries = async () => {
       
      if(dataDiaries.length > 0) {
        setShowDiaries(!showDiaries);
        return;
      }

      const data =  await diariesGet({idPalavraChave:keyWordsCheckeds});

      if(data !== undefined){
        setQuantityDiariesSelected(data.length)
        setDataDiaries(data);
      }      

        const dataChekeds = data?.map(item => {
          return item.id
        });

      
        if(dataChekeds !== undefined){
          setDataDiariesCheckeds(dataChekeds);  
          setValue("idDiario",dataChekeds)
        }

        setShowDiaries(true);
      
    }

    return (
      <ContainerMultiSelect>
      <SpaceRow>  
        <Title>Diários</Title>
        <ClearButtom onPress={()=> onChangeSelected([])}><ClearButtomText>Limpar</ClearButtomText></ClearButtom>
      </SpaceRow>

      
        <ContainerSubtitle onPress={() => handleGetDiaries ()}>
          <SpaceRow>  
              <SubTitleMultiSelectText>{quantityDiariesSelected} Diário(s) selecionado(s)</SubTitleMultiSelectText>
              <Label><MaterialIcons name="arrow-drop-down" size={18} color="gray" /></Label>
          </SpaceRow>
        </ContainerSubtitle>
        { 
          isLoadingDiaries  ? 
          (
            <ContainerSpinner>
              <Spinner />
            </ContainerSpinner>) : (

              showDiaries && 
            
              <Row>
                <Controller
                  name="idDiario"
                  control={control}
                  defaultValue={[]}
                  render={() => (
                      <MultiSelectCheckBox  
                        data={dataDiaries}
                        dataCheckeds={dataDiariesCheckeds}                          
                        onChangeSelected={onChangeSelected} 
                        />
                  )}>
                </Controller>
              </Row>
          )
      }
    </ContainerMultiSelect>
    );
  },[dataDiaries,showDiaries,quantityDiariesSelected,isLoadingDiaries]);

  const renderJournals = useCallback(() => {

    const onChangeSelected = (data:Array<number>) => {
      
        setQuantityJournalsSelected(data.length)
        setDataJournalsCheckeds(data);   
        setValue("idJournals",data)
    }

    const handleGetJournals = async () => {
       
      if(dataJournals.length > 0) {
        setShowJournals(!showJournals);
        return;
      }
     
      const data =  await journalsGet({IdsDiario:dataDiariesCheckeds});

      setQuantityJournalsSelected(data.length)

      setShowJournals(true);

      const dataChekeds = data?.map(item => {
        return item.id
      });

      setDataJournalsCheckeds(dataChekeds);  

      setValue("idJournals",dataChekeds)

      setDataJournals(data);
    }

    return (
      <ContainerMultiSelect>
      <SpaceRow>  
        <Title>Cardernos</Title>
        <ClearButtom onPress={()=> onChangeSelected([])}><ClearButtomText>Limpar</ClearButtomText></ClearButtom>
      </SpaceRow>

      
        <ContainerSubtitle onPress={() => handleGetJournals ()}>
          <SpaceRow>  
              <SubTitleMultiSelectText>{quantityJournalsSelected} Caderno(s) selecionado(s)</SubTitleMultiSelectText>
              <Label><MaterialIcons name="arrow-drop-down" size={18} color="gray" /></Label>
          </SpaceRow>
        </ContainerSubtitle>
        { 
          isLoadingJournals  ? 
          (
            <ContainerSpinner>
              <Spinner />
            </ContainerSpinner>) : (

              showJournals && 
            
              <Row>
                <Controller
                  name="idJournals"
                  control={control}
                  defaultValue={[]}
                  render={() => (
                      <MultiSelectCheckBox  
                        data={dataJournals}
                        dataCheckeds={dataJournalsCheckeds}                          
                        onChangeSelected={onChangeSelected} 
                        />
                  )}>
                </Controller>
              </Row>
          )
      }
    </ContainerMultiSelect>
    );
  },[dataJournals, showJournals, quantityJournalsSelected, isLoadingJournals]);
  
  const footer = () => (
    <Submit onPress={handleSubmit(onSubmit)}>
      <SubmitText>Ver resultados</SubmitText>
    </Submit>
  );

  const radio_props = [
    { label: 'Todas as situações', value: null },
    { label: 'Lidas', value: true },
    { label: 'Não lidas', value: false },
  ];

  const RBLabel = stylesRBLabel(colors);

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
                title="dd/mm/aaaa"
                style={{ maxWidth: 100 }}
                minDate={minDate || undefined}
                onDateChange={date => { setMaxDate(date), onChange(FormatFullDateEN(date)) }}
              />
            )}>
          </Controller>
        </Column>
      </Row>
      
      {renderTypesMovimentation()}
          
      <ContainerSituation>
      
        <Row>
          <Title>Situações</Title>
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

        </ContainerSituation>

         

        {showKeyWordsAll && renderKeyWords()}

        {keyWordsCheckeds.length > 0 && renderDiaries()}

        {dataDiariesCheckeds.length > 0 && renderJournals()}
      
    </Modal>
  );
});

const stylePickerSelectStyles =  (colors) => StyleSheet.create({
  inputIOS: {
    fontSize: 16,
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
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLighter,
  },
});

const stylesRBLabel =  (colors) => StyleSheet.create({
  label: {
    'color':  colors.grayDarker,
    'fontFamily': fonts.circularStdBook,
    'fontSize': fonts.regular,
  }
});


