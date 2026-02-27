import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

import Modal from '@lcomponents/Modal';
import Datepicker from '@lcomponents/DatePicker';
import { FormatDateEN, FormatDateBR } from '@lhelpers/DateFunctions';

import { MaskMoney, MaskMoneyForRegister } from '@lhelpers/Mask';

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

const ReleaseEdit = forwardRef((props, ref) => {
  const navigation = useNavigation();

  const { item, onClose } = props;

  const type = item?.debitoCredito || 'D';

  // // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const valueInputRef = useRef(null);

  const [dataCategories, setDataCategoriesResume] = useState<CategoryProps[]>(
    [],
  );
  const [dataPeople, setDataPeople] = useState<PersonProps[]>([]);
  const [dataProcess, setDataProcess] = useState<ProcessProps[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const initializedRef = useRef(false);
  const dependentValuesSetRef = useRef(false);

  // - Loading Categories
  const { isLoadingCategories, getCategoriesData } = useGetPopulateCategories();

  // - Loading People
  const { isLoadingPeople, getPeopleData } = useGetPopulatePeople();

  // - Loading Process
  const { isLoadingProcess, getProcessData } = useGetPopulateProcess();

  // - Loading data finance
  const { isLoadingFinanceID, getFinanceDataID } = useGetFinanceID();

  // import add function hook
  const { isLoadingRelease, updateRelease } = useRelease();

  // Set Durantion starting empty array
  const [duration, setDuration] = useState([]);

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
    if (!item) {
      dependentValuesSetRef.current = false;
      initializedRef.current = false;
      return;
    }

    // Reseta os refs quando o item muda
    if (initializedRef.current !== item.idLancamentoFinanceiro) {
      dependentValuesSetRef.current = false;
    }

    handleChangeTypeDuration(item.idTipoParcelamentoFinanceiro);
    fetchDataCategories();
    fetchPeople();
    fetchProcess();
    // fetchInformationAcountUser será chamado dentro do initializeForm
  }, [item?.idLancamentoFinanceiro]);

  // Setar valores que dependem dos dados carregados (categoria, pessoa, processo)
  useEffect(() => {
    if (!item) {
      dependentValuesSetRef.current = false;
      return;
    }

    const currentItemId = item.idLancamentoFinanceiro;

    // Evita re-inicialização se já foi setado para o mesmo item
    if (
      dependentValuesSetRef.current &&
      initializedRef.current === currentItemId
    ) {
      return;
    }

    // Aguarda os dados serem carregados
    if (
      dataCategories.length === 0 ||
      dataPeople.length === 0 ||
      dataProcess.length === 0
    ) {
      return;
    }

    // Verifica se categoriaFinanceiro existe e tem idCategoriaFinanceiro
    if (item.categoriaFinanceiro?.idCategoriaFinanceiro) {
      setValue(
        'idCategoriaFinanceiro',
        item.categoriaFinanceiro.idCategoriaFinanceiro,
        { shouldValidate: false },
      );
    }

    // Verifica se idPessoaCliente existe
    if (item.idPessoaCliente) {
      setValue('idPessoaCliente', item.idPessoaCliente, {
        shouldValidate: false,
      });
    }

    // Verifica se idProcesso existe
    if (item.idProcesso) {
      setValue('idProcesso', item.idProcesso, { shouldValidate: false });
    }

    // Marca como setado para este item
    dependentValuesSetRef.current = true;
  }, [item?.idLancamentoFinanceiro]);

  const fetchDataCategories = async () => {
    try {
      // O hook aceita 'D' (Despesa) ou 'C' (Crédito/Receita)
      // item.debitoCredito já vem como 'D' ou 'C'
      const categoryType = type === 'D' || type === 'C' ? type : 'D';
      const responseCategories = await getCategoriesData(
        categoryType as 'D' | 'R',
      );
      if (responseCategories) {
        setDataCategoriesResume(responseCategories);
      }
    } catch (error) {
      // Erro ao buscar categorias
    }
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
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      descricao: null,
      valor: null,
      DataVencimento: null,
      idCategoriaFinanceiro: null,
      idPessoaCliente: null,
      idProcesso: null,
      IdTipoParcelamentoFinanceiro: -1,
      quantidadeParcelas: '1',
      observacao: null,
      idFinanceiro: null,
      idContaFinanceiro: null,
    },
  });

  // Watch os valores para atualizar em tempo real
  const idCategoriaFinanceiro = watch('idCategoriaFinanceiro');
  const idPessoaCliente = watch('idPessoaCliente');
  const idProcesso = watch('idProcesso');
  const idTipoParcelamentoFinanceiro = watch('IdTipoParcelamentoFinanceiro');

  const fetchInformationAcountUser = useCallback(async () => {
    try {
      const responseFinanceData = await getFinanceDataID();
      if (responseFinanceData && responseFinanceData.length > 0) {
        setValue('idContaFinanceiro', responseFinanceData[0].idContaFinanceiro);
        // Sempre usa o idFinanceiro da conta do usuário, não do item
        // O idFinanceiro da conta é o correto para edições
        setValue('idFinanceiro', responseFinanceData[0].idFinanceiro);
      }
    } catch (error) {
      // Erro ao buscar dados da conta financeira
    }
  }, [setValue, getFinanceDataID]);

  // Setar valores básicos imediatamente quando o item chegar
  useEffect(() => {
    if (!item) {
      initializedRef.current = false;
      dependentValuesSetRef.current = false;
      return;
    }

    // Evita re-inicialização se já foi inicializado com o mesmo item
    if (
      initializedRef.current &&
      initializedRef.current === item.idLancamentoFinanceiro
    ) {
      return;
    }

    const initializeForm = async () => {
      // Converte a data de string DD/MM/YYYY para Date object
      let dateObject: Date | null = null;
      if (item.dataVencimentoFormatada) {
        // Converte DD/MM/YYYY para Date
        const [day, month, year] = item.dataVencimentoFormatada.split('/');
        dateObject = new Date(
          parseInt(year, 10),
          parseInt(month, 10) - 1,
          parseInt(day, 10),
        );
        setSelectedDate(dateObject);
      }

      // Aguarda o fetchInformationAcountUser ser executado
      await fetchInformationAcountUser();

      // Busca os valores que foram setados pelo fetchInformationAcountUser
      const currentIdFinanceiro = getValues('idFinanceiro');
      const currentIdContaFinanceiro = getValues('idContaFinanceiro');

      // Usa reset para setar todos os valores de uma vez
      reset(
        {
          descricao: item.descricaoLancamento || '',
          valor: item.value || '',
          DataVencimento: item.dataVencimentoFormatada || '',
          IdTipoParcelamentoFinanceiro: item.idTipoParcelamentoFinanceiro || -1,
          quantidadeParcelas: item.quantidadeParcelas?.toString() || '1',
          observacao: item.observacao || '',
          idCategoriaFinanceiro:
            item.categoriaFinanceiro?.idCategoriaFinanceiro || null,
          idPessoaCliente: item.idPessoaCliente || null,
          idProcesso: item.idProcesso || null,
          // idFinanceiro e idContaFinanceiro - usa os valores já setados ou o idLancamentoFinanceiro
          idFinanceiro:
            currentIdFinanceiro || item.idLancamentoFinanceiro || null,
          idContaFinanceiro: currentIdContaFinanceiro || null,
        },
        {
          keepDefaultValues: false,
          keepValues: false,
        },
      );

      // Marca como inicializado
      initializedRef.current = item.idLancamentoFinanceiro;
    };

    initializeForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.idLancamentoFinanceiro]);

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
          <RegisterText>Alterar</RegisterText>
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

    data.DataVencimento = FormatDateEN(data.DataVencimento);

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
    const observacao = data.observacao === null ? '' : data.observacao;
    const dataEmissao = moment().format('YYYY-MM-DD H:mm:ss');

    // Garante que idFinanceiro e idContaFinanceiro estejam presentes
    // Para edição, sempre usa o idFinanceiro do item original ou do form
    // Não usa item.idLancamentoFinanceiro como fallback pois pode ser diferente
    const idFinanceiro =
      getValues('idFinanceiro') ||
      data.idFinanceiro ||
      (item.idFinanceiro ? item.idFinanceiro : null);
    const idContaFinanceiro =
      getValues('idContaFinanceiro') || data.idContaFinanceiro || null;

    const register = {
      itens: [
        {
          ...data,
          DebitoCredito: type,
          repeticaoFixo,
          dataEmissao,
          quantidadeParcelas,
          valorOriginal: data.valor,
          alterarEsteEProximosLancamentos: 'false',
          idLancamentoFinanceiro: item.idLancamentoFinanceiro,
          idParcelaFinanceiro: item.idParcelaFinanceiro,
          idFinanceiro: idFinanceiro,
          idContaFinanceiro: idContaFinanceiro,
          observacao,
          idProcesso: data.idProcesso || '',
        },
      ],
    };

    updateRelease(register, () => handleOnClose());
  };

  return (
    <Modal
      maxHeight={650}
      onClose={onClose}
      ref={ref}
      title={type === 'D' ? 'Editar despesa' : 'Editar receita'}
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
            render={({ field }) => {
              return (
                <Input
                  value={field.value || ''}
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
                  onChangeText={value => {
                    field.onChange(value);
                  }}
                />
              );
            }}
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
            render={({ field }) => (
              <Input
                ref={valueInputRef}
                placeholder="R$ -"
                placeholderTextColor={
                  errors.valor ? colors.red200 : colors.grayLight
                }
                keyboardType="numeric"
                onChangeText={text => {
                  const maskedValue = text !== '0,0' ? MaskMoney(text) : '';
                  field.onChange(maskedValue);
                }}
                value={field.value || ''}
              />
            )}
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
            render={() => (
              <Datepicker
                date={selectedDate}
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
                  // Atualiza o estado local com o Date object
                  setSelectedDate(date);
                  // Converte o Date object para string no formato DD/MM/YYYY e salva no form
                  const dateString = FormatDateBR(date);
                  setValue('DataVencimento', dateString);
                }}
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
                              padding: 1,
                            }
                          : { backgroundColor: category.corCategoria },
                      ]}
                      onPress={() => {
                        setValue(
                          'idCategoriaFinanceiro',
                          isSelected ? null : category.idCategoriaFinanceiro,
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
                              padding: 1,
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
          <Label>Processo</Label>
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
                              padding: 1,
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
                            padding: 1,
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
            rules={{
              required: getValues('IdTipoParcelamentoFinanceiro') !== -1,
            }}
            control={control}
            render={({ field }) => (
              <ContainerInfo>
                <RNPickerSelect
                  placeholder={{
                    label: 'Selecione',
                    value: null,
                  }}
                  disabled={getValues('IdTipoParcelamentoFinanceiro') === -1}
                  doneText="Selecionar"
                  style={{
                    ...pickerSelectStyles,
                    placeholder: {
                      color: colors.black,
                    },
                  }}
                  value={field.value}
                  onValueChange={value => {
                    field.onChange(value);
                  }}
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
              </ContainerInfo>
            )}
          />
        </Row>
      </ContentDuring>

      <ContentComments>
        <Row>
          <LabelComments>Observações</LabelComments>
        </Row>
        <Controller
          name="observacao"
          control={control}
          render={({ field }) => (
            <InputDescription
              value={field.value || ''}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite uma observação"
              placeholderTextColor={colors.grayLight}
              onChangeText={value => {
                field.onChange(value);
              }}
              returnKeyType="next"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
      </ContentComments>
    </Modal>
  );
});

export default ReleaseEdit;

const stylesPickerSelectStyles = colors => {
  const baseStyles = {
    inputIOS: {
      fontSize: 14,
      color: colors.fadedBlack,
      marginTop: 2,
    },
    inputAndroid: {
      flex: 1,
      height: 40,
      marginTop: 5,
      padding: 10,
      paddingHorizontal: 0,
      fontSize: 16,
      color: colors.grayDarker,
      minWidth: 400,
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
