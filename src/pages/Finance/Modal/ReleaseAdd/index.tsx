import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Modal from '@lcomponents/Modal';
import Datepicker from '@lcomponents/DatePicker';
import { FormatFullDateEN, FormatDateBR } from '@lhelpers/DateFunctions';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { MaskMoney, MaskMoneyForRegister } from '@lhelpers/Mask';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

import { fonts } from '@lassets/styles';

import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Row,
  Label,
  LabelError,
  Input,
  RowLabel,
  ContainerItems,
  LabelItems,
  ContainerItemsOptions,
  LabelItemsProcess,
  ContentDuring,
  LabelDuring,
  ContentComments,
  LabelComments,
  InputDescription,
  RegisterText,
  Register,
  ContentDescription,
  ContentRepeat,
  ContainerInfo,
  People,
  Category,
  Process,
  ItemsOptions,
  PickerContainer,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import { useTheme } from 'styled-components';
import { useGetPopulateCategories } from '@services/hooks/Finances/useCategories';
import { useGetPopulatePeople } from '@services/hooks/Finances/usePeople';
import {
  CategoryProps,
  PersonProps,
  ProcessProps,
} from '@pages/Finance/Category/types';
import { useGetPopulateProcess } from '@services/hooks/Finances/useProcess';
import {
  useGetFinanceID,
  useRelease,
} from '@services/hooks/Finances/useReleases';

import RNPickerSelect from 'react-native-picker-select';
import { Controller, useForm } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native';

export default ReleaseAdd = forwardRef((props, ref) => {
  const navigation = useNavigation();

  const { type, onClose } = props;

  // // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const valueInputRef = useRef(null);

  const [dataCategories, setDataCategoriesResume] = useState<CategoryProps[]>(
    [],
  );
  const [dataPeople, setDataPeople] = useState<PersonProps[]>([]);
  const [dataProcess, setDataProcess] = useState<ProcessProps[]>([]);

  // - Loading Categories
  const { isLoadingCategories, getCategoriesData } = useGetPopulateCategories();

  // - Loading People
  const { isLoadingPeople, getPeopleData } = useGetPopulatePeople();

  // - Loading Process
  const { isLoadingProcess, getProcessData } = useGetPopulateProcess();

  // - Loading data finance
  const { isLoadingFinanceID, getFinanceDataID } = useGetFinanceID();

  // import add function hook
  const { isLoadingRelease, addRelease } = useRelease();

  // Set Durantion starting empty array
  const [duration, setDuration] = useState([]);

  // Estado local para controlar o valor formatado
  const [valorLocal, setValorLocal] = useState('');

  const handleChangeTypeDuration = (selectedRepeat: number) => {
    let i = 2;
    switch (selectedRepeat) {
      case -1:
        setDuration([{ value: null, label: '' }]);
        break;
      case -9:
        const days = [
          {
            value: '1',
            label: 'Diariamente',
          },
        ];
        while (i < 1827) {
          days.push({
            value: `${i}`,
            label: `${i} dias`,
          });

          i++;
        }
        setDuration(days);
        break;
      case -7:
        const fortnight = [
          {
            value: '1',
            label: 'Quinzenalmente',
          },
        ];
        while (i < 122) {
          fortnight.push({
            value: `${i}`,
            label: `${i} quinzenas`,
          });

          i++;
        }
        setDuration(fortnight);
        break;
      case -8:
        const weekly = [
          {
            value: '1',
            label: 'Semanalmente',
          },
        ];
        while (i < 261) {
          weekly.push({
            value: `${i}`,
            label: `${i} semanas`,
          });

          i++;
        }
        setDuration(weekly);
        break;
      case -6:
        const monthly = [
          {
            value: '1',
            label: 'Mensalmente',
          },
        ];
        while (i < 61) {
          monthly.push({
            value: `${i}`,
            label: `${i} meses`,
          });

          i++;
        }
        setDuration(monthly);
        break;
      case -2:
        const annually = [
          {
            value: '1',
            label: 'Anualmente',
          },
        ];
        while (i < 6) {
          annually.push({
            value: `${i}`,
            label: `${i} anos`,
          });

          i++;
        }
        setDuration(annually);
        break;

      default:
        break;
    }
  };

  const pickerSelectStyles = stylesPickerSelectStyles(colors);

  useEffect(() => {
    fetchDataCategories();
    fetchPeople();
    fetchProcess();
    fetchInformationAcountUser();
  }, []);

  // Limpa o valor local quando o modal fecha
  useEffect(() => {
    if (!ref.current) {
      setValorLocal('');
    }
  }, [ref]);

  const fetchDataCategories = async () => {
    try {
      const categoryType = type
        ? (type.toUpperCase() as 'D' | 'R' | 'C')
        : undefined;
      const responseCategories = await getCategoriesData(categoryType);

      setDataCategoriesResume(responseCategories);
    } catch (error) {}
  };

  const fetchPeople = async () => {
    try {
      const responsePeople = await getPeopleData();
      setDataPeople(responsePeople);
    } catch (error) {}
  };

  const fetchProcess = async () => {
    try {
      const responseProcess = await getProcessData();
      setDataProcess(responseProcess);
    } catch (error) {}
  };

  const fetchInformationAcountUser = async () => {
    try {
      const responseFinanceData = await getFinanceDataID();
      setValue('idContaFinanceiro', responseFinanceData[0].idContaFinanceiro);
      setValue('idFinanceiro', responseFinanceData[0].idFinanceiro);
    } catch (error) {}
  };

  const dataOptionsRepeat = [
    {
      label: 'Não se repete',
      value: -1,
    },
    {
      label: 'Todos os dias',
      value: -9,
    },
    {
      label: 'Semanal',
      value: -8,
    },
    {
      label: 'Quinzenal',
      value: -7,
    },
    {
      label: 'Mensal',
      value: -6,
    },
    {
      label: 'Anual',
      value: -2,
    },
  ];

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
  });

  // Watch os valores para atualizar em tempo real
  const idCategoriaFinanceiro = watch('idCategoriaFinanceiro');
  const idPessoaCliente = watch('idPessoaCliente');
  const idProcesso = watch('idProcesso');
  const idTipoParcelamentoFinanceiro = watch('IdTipoParcelamentoFinanceiro');

  const footer = () => (
    <Footer>
      <Cancel onPress={() => onClose()} disabled={isLoadingRelease}>
        <CancelText>Cancelar</CancelText>
      </Cancel>

      <Register
        onPress={handleSubmit(onSubmit)}
        disabled={isLoadingRelease}
        style={{
          opacity: isLoadingRelease ? 0.6 : 1,
        }}
      >
        {isLoadingRelease ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <RegisterText>Cadastrar</RegisterText>
        )}
      </Register>
    </Footer>
  );

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onSubmit = data => {
    if (data.valor === '0,00') {
      setError('valor', {
        type: 'manual',
        message: 'Campo valor não pode ser 0,00',
      });
      return;
    }

    data.DataVencimento = FormatFullDateEN(data.DataVencimento);
    data.valor = MaskMoneyForRegister(data.valor);

    const repeticaoFixo =
      data.IdTipoParcelamentoFinanceiro === -1 ||
      data.IdTipoParcelamentoFinanceiro === undefined
        ? false
        : data.quantidadeParcelas > 1
        ? false
        : true;

    const quantidadeParcelas =
      data.IdTipoParcelamentoFinanceiro === -1 ? 1 : data.quantidadeParcelas;
    const dataEmissao = moment().format('YYYY-MM-DD H:mm:ss');
    const register = {
      itens: [
        {
          ...data,
          DebitoCredito: type,
          repeticaoFixo,
          dataEmissao,
          quantidadeParcelas,
        },
      ],
    };

    addRelease(register, () => handleOnClose());
  };

  const scenePickerSelectStyles = stylesScenePickerSelectStyles(colors);

  return (
    <Modal
      maxHeight={650}
      onClose={onClose}
      ref={ref}
      title={type === 'D' ? 'Cadastrar despesa' : 'Cadastrar receita'}
      footer={footer()}
    >
      <ContentDescription isError={errors.descricao}>
        <Row>
          <Label>Descrição</Label>
          <Controller
            name="descricao"
            rules={{
              required: true,
            }}
            control={control}
            defaultValue={null}
            render={({ value }) => (
              <Input
                value={value}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Título do lançamento"
                placeholderTextColor={
                  errors.descricao ? colors.red200 : colors.grayLight
                }
                returnKeyType="next"
                onSubmitEditing={() => {
                  valueInputRef.current?.focus();
                }}
                onChangeText={value => setValue('descricao', value)}
              />
            )}
          />
        </Row>
      </ContentDescription>

      <Content isError={errors.valor}>
        <Row>
          <Label>Valor</Label>

          <Controller
            name="valor"
            rules={{
              required: true,
            }}
            control={control}
            defaultValue={null}
            render={({ value }) => {
              // Usa o valor local se existir, senão usa o valor do form
              const displayValue = valorLocal !== '' ? valorLocal : value || '';

              return (
                <Input
                  ref={valueInputRef}
                  placeholder="R$ -"
                  placeholderTextColor={
                    errors.valor ? colors.red200 : colors.grayLight
                  }
                  keyboardType="numeric"
                  onChangeText={text => {
                    // Remove caracteres não numéricos
                    const numericText = text.replace(/\D/g, '');
                    // Aplica a máscara apenas se houver números
                    if (numericText) {
                      // Trata como centavos: divide por 100 para converter para reais
                      // Usa toFixed(2) para garantir 2 casas decimais e depois substitui ponto por vírgula
                      // Exemplo: "150" -> 1.50 -> "1,50", "199" -> 1.99 -> "1,99"
                      const numericValue = parseInt(numericText, 10);
                      const valueInReais = numericValue / 100;
                      const valueWithDecimals = valueInReais
                        .toFixed(2)
                        .replace('.', ',');
                      // Aplica a máscara formatando com separadores de milhar
                      const parts = valueWithDecimals.split(',');
                      const integerPart = parts[0].replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.',
                      );
                      const maskedValue = integerPart + ',' + parts[1];
                      setValorLocal(maskedValue);
                      setValue('valor', maskedValue);
                    } else {
                      setValorLocal('');
                      setValue('valor', '');
                    }
                  }}
                  value={displayValue}
                />
              );
            }}
          />
        </Row>
      </Content>

      <Content isError={errors.DataVencimento}>
        <Row>
          <Label>Vencimento</Label>
          <Controller
            name="DataVencimento"
            rules={{
              required: true,
            }}
            control={control}
            render={({ value }) => (
              <Datepicker
                date={value}
                enabled={true}
                title={
                  <Text
                    style={{
                      color: errors.DataVencimento
                        ? colors.red200
                        : colors.black,
                    }}
                  >
                    Selecione uma data
                  </Text>
                }
                style={{
                  marginTop: -2,
                  flexGrow: 1,
                  maxWidth: 200,
                  height: 22,
                }}
                onDateChange={date => {
                  setValue('DataVencimento', date);
                }}
                value={value}
              />
            )}
          />
        </Row>
      </Content>

      <Category isError={errors.idCategoriaFinanceiro}>
        <RowLabel>
          <Label>Categoria</Label>
          {errors.idCategoriaFinanceiro && (
            <LabelError>Selecione uma categoria</LabelError>
          )}
        </RowLabel>

        <ContainerItems>
          <Controller
            name="idCategoriaFinanceiro"
            rules={{
              required: true,
            }}
            control={control}
            render={() => (
              <>
                {dataCategories.map(category => {
                  const isSelected =
                    idCategoriaFinanceiro === category.idCategoriaFinanceiro;
                  return (
                    <ItemsOptions
                      key={category.idCategoriaFinanceiro}
                      style={[
                        isSelected
                          ? {
                              borderWidth: 2,
                              borderColor: colors.primary,
                              backgroundColor: colors.primary,
                            }
                          : { backgroundColor: category.corCategoria },
                      ]}
                      onPress={() => {
                        setValue(
                          'idCategoriaFinanceiro',
                          category.idCategoriaFinanceiro,
                          { shouldValidate: true },
                        );
                      }}
                    >
                      <LabelItems
                        style={[
                          isSelected ||
                          category.corCategoria === colors.colorlessBadge
                            ? {
                                color: colors.white,
                              }
                            : { color: colors.primary },
                        ]}
                      >
                        {category.nomeCategoriaFinanceiro}
                      </LabelItems>
                      {isSelected && (
                        <MaterialIcons
                          name={'close'}
                          size={15}
                          color={colors.white}
                        />
                      )}
                    </ItemsOptions>
                  );
                })}
              </>
            )}
          />
        </ContainerItems>
      </Category>

      <People>
        <RowLabel>
          <Label>Pessoa</Label>
        </RowLabel>

        <ContainerItemsOptions>
          <Controller
            name="idPessoaCliente"
            control={control}
            defaultValue={null}
            render={() => (
              <>
                {dataPeople.map(person => {
                  const isSelected = idPessoaCliente === person.idPessoaCliente;
                  return (
                    <ItemsOptions
                      key={person.idPessoaCliente}
                      onPress={() => {
                        setValue('idPessoaCliente', person.idPessoaCliente, {
                          shouldValidate: true,
                        });
                      }}
                      style={[
                        isSelected
                          ? {
                              borderWidth: 2,
                              borderColor: colors.primary,
                              backgroundColor: colors.primary,
                            }
                          : { backgroundColor: colors.gray },
                      ]}
                    >
                      <LabelItems
                        style={[
                          isSelected
                            ? {
                                color: colors.white,
                              }
                            : { color: colors.primary },
                        ]}
                      >
                        {person.nomePessoaCliente}
                      </LabelItems>

                      {isSelected && (
                        <MaterialIcons
                          name={'close'}
                          size={15}
                          color={colors.white}
                        />
                      )}
                    </ItemsOptions>
                  );
                })}
              </>
            )}
          />
        </ContainerItemsOptions>
      </People>

      <Process>
        <RowLabel>
          <Label>Processos</Label>
        </RowLabel>

        <ContainerItemsOptions>
          <Controller
            name="idProcesso"
            control={control}
            render={() => (
              <>
                {dataProcess.map(process => {
                  const isSelected = idProcesso === process.idProcesso;
                  return (
                    <ItemsOptions
                      key={process.idProcesso}
                      onPress={() => {
                        setValue('idProcesso', process.idProcesso, {
                          shouldValidate: true,
                        });
                      }}
                      style={[
                        isSelected
                          ? {
                              borderWidth: 2,
                              borderColor: colors.primary,
                              backgroundColor: colors.primary,
                            }
                          : { backgroundColor: colors.gray },
                      ]}
                    >
                      <LabelItemsProcess
                        style={[
                          isSelected
                            ? {
                                color: colors.white,
                              }
                            : { color: colors.primary },
                        ]}
                      >
                        {process.numeroProcesso}
                      </LabelItemsProcess>

                      {isSelected && (
                        <MaterialIcons
                          name={'close'}
                          size={15}
                          color={colors.white}
                        />
                      )}
                    </ItemsOptions>
                  );
                })}
              </>
            )}
          />
        </ContainerItemsOptions>
      </Process>

      <ContentRepeat>
        <RowLabel>
          <Label>Repetir</Label>
        </RowLabel>

        <Controller
          name="IdTipoParcelamentoFinanceiro"
          control={control}
          render={() => (
            <ContainerItemsOptions>
              {dataOptionsRepeat.map(repeat => {
                const isSelected =
                  idTipoParcelamentoFinanceiro === repeat.value;
                return (
                  <ItemsOptions
                    key={repeat.value}
                    onPress={() => {
                      setValue('IdTipoParcelamentoFinanceiro', repeat.value, {
                        shouldValidate: true,
                      });
                      handleChangeTypeDuration(repeat.value);
                    }}
                    style={[
                      isSelected
                        ? {
                            borderWidth: 2,
                            borderColor: colors.primary,
                            backgroundColor: colors.primary,
                          }
                        : { backgroundColor: colors.gray },
                    ]}
                  >
                    <LabelItems
                      style={[
                        isSelected
                          ? {
                              color: colors.white,
                            }
                          : { color: colors.primary },
                      ]}
                    >
                      {repeat.label}
                    </LabelItems>

                    {isSelected && (
                      <MaterialIcons
                        name={'close'}
                        size={15}
                        color={colors.white}
                      />
                    )}
                  </ItemsOptions>
                );
              })}
            </ContainerItemsOptions>
          )}
        />
      </ContentRepeat>

      <ContentDuring>
        <Row>
          <LabelDuring>Durante</LabelDuring>

          <Controller
            name="quantidadeParcelas"
            control={control}
            defaultValue={1}
            render={({ value }) => (
              <PickerContainer>
                <RNPickerSelect
                  style={scenePickerSelectStyles}
                  onValueChange={value => {
                    setValue('quantidadeParcelas', value);
                  }}
                  disabled={
                    getValues('IdTipoParcelamentoFinanceiro') === -1 ||
                    duration.length === 0
                  }
                  placeholder={{}}
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
                  doneText="Selecionar"
                  value={value}
                  items={duration}
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
              </PickerContainer>
            )}
          />
        </Row>
      </ContentDuring>

      <ContentComments>
        <Row>
          <LabelComments>Observações </LabelComments>
        </Row>
        <Controller
          name="observacao"
          control={control}
          defaultValue={null}
          render={() => (
            <InputDescription
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite uma observação"
              placeholderTextColor={colors.grayLight}
              onChangeText={value => setValue('observacao', value)}
              returnKeyType="next"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
      </ContentComments>
    </Modal>
  );
});

const stylesPickerSelectStyles = colors =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      color: colors.fadedBlack,
      marginTop: 2,
    },
    inputAndroid: {
      height: 20,
      padding: 0,
      fontSize: 16,
      color: colors.fadedBlack,

      minWidth: 400,
    },
  });

const stylesScenePickerSelectStyles = colors => {
  const baseStyles = {
    inputIOS: {
      fontSize: 16,
      color: colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
      minWidth: 220,
    },
    inputAndroid: {
      height: 40,
      padding: 10,
      paddingHorizontal: 0,
      fontSize: 16,
      color: colors.grayDarker,
      fontFamily: fonts.circularStdBook,
      minWidth: 220,
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

// const stylesScenePickerSelectStyles = colors =>
// 	StyleSheet.create({
// 		inputIOS: {
// 			fontSize: 16,
// 			color: colors.fadedBlack,
// 			fontFamily: fonts.circularStdBook,
// 		},
// 		inputAndroid: {
// 			height: 20,
// 			padding: 0,
// 			fontSize: 16,
// 			color: colors.fadedBlack,
// 			fontFamily: fonts.circularStdBook,
// 			minWidth: 400,
// 		},
// 	});
