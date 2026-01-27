import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Linking, StyleSheet } from 'react-native';

import { StackActions } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

import Datepicker from '@lcomponents/DatePicker';
import Spinner from '@lcomponents/Spinner';
import UserActions from '@lstore/ducks/User';
import CustomerActions from '@lstore/ducks/Customer';
import AuthAction from '@lstore/ducks/Auth';

import { fonts } from '@lassets/styles';
import { Container, Warp, HeaderAction } from '@lassets/styles/global';
import {
  PickerContainer,
  ProfileContainer,
  ProfileImageButton,
  ProfileImageContainer,
  ProfileImage,
  InfoContainer,
  InfoTitle,
  InfoCustomValue,
  InfoValue,
  InfoLink,
  InfoLinkText,
  InfoText,
  InfoContent,
  ButtonLogout,
  LogoutText,
  DateStyle,
} from './styles';

import moment from 'moment';
import { FormatDateBR, FormatFullDateEN } from '@lhelpers/DateFunctions';
import { disableNotificationDevice } from '@lhelpers/Pushs';
import {
  TOKEN,
  REFRESH_TOKEN,
  EXPIRES_TOKEN,
  AVATAR,
  PERMISSIONS,
  ACCEPT_TERMS,
} from '@lhelpers/StorageKeys';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const Infos = props => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const pickerSelectStyles = stylesPickerSelectStyles(colors);

  const scenePickerSelectStyles = stylesScenePickerSelectStyles(colors);

  const [scene, setScene] = useState('user');
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const loading = useSelector(state => state.user.loading);
  const userData = useSelector(state => state.user);
  const picture = useSelector(state => state.user.picture);
  const customerData = useSelector(state => state.customer.data);

  const active = useSelector(state => state.auth.active);

  const oabTypes = useSelector(state =>
    state.user.typesOAB.map(type => {
      return {
        value: type.id,
        label: type.nome,
      };
    }),
  );

  const ufs = useSelector(state =>
    state.user.ufs.map(state => {
      return {
        value: state.id,
        label: state.nome,
      };
    }),
  );

  const scenes = [
    {
      label: 'Dados do perfil',
      value: 'user',
    },
    {
      label: 'Dados do contratante',
      value: 'hirer',
    },
  ];

  const dispatch = useDispatch();

  // useEffect(() => { props.navigation.dispatch(CommonActions.navigate({ name: 'Login' })); }, []);

  useEffect(() => {
    if (!props.selected || !active) return;

    props.setCustomActions(
      <HeaderAction key={1}>
        <MaterialIcons
          name={editMode ? 'check' : 'edit'}
          size={20}
          color={colors.fadedBlack}
          onPress={() =>
            editMode ? editUserData(userData) : setEditMode(!editMode)
          }
        />
      </HeaderAction>,
    );
  }, [props.selected, colors]);

  useEffect(() => {
    props.setCustomActions(
      <HeaderAction key={1}>
        <MaterialIcons
          name={editMode ? 'check' : 'edit'}
          size={20}
          color={colors.fadedBlack}
          onPress={() =>
            editMode ? editUserData(userData) : setEditMode(!editMode)
          }
        />
      </HeaderAction>,
    );
  }, [editMode, userData, colors]);

  useEffect(() => {
    dispatch(UserActions.personRequest());

    dispatch(CustomerActions.customerRequest());
  }, []);

  // Inicializa a data de nascimento quando userData é carregado
  useEffect(() => {
    if (userData.data?.dataNascimentoAbertura) {
      // Converte a data de string (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss) para Date object
      let dateObject = null;
      const dateStr = userData.data.dataNascimentoAbertura;

      if (dateStr) {
        // Se já está no formato ISO, usa diretamente
        if (dateStr.includes('T')) {
          dateObject = new Date(dateStr);
        } else {
          // Se está no formato YYYY-MM-DD, adiciona hora
          dateObject = new Date(dateStr + 'T00:00:00');
        }

        // Verifica se a data é válida
        if (dateObject && !isNaN(dateObject.getTime())) {
          setSelectedDate(dateObject);
        } else {
          setSelectedDate(null);
        }
      } else {
        setSelectedDate(null);
      }
    } else {
      setSelectedDate(null);
    }
  }, [userData.data?.dataNascimentoAbertura]);

  const logoutUser = useCallback(() => {
    try {
      disableNotificationDevice()
        .then(() => {
          dispatch(AuthAction.logoutRequest());
        })
        .finally(() => {
          AsyncStorage.multiRemove(
            [
              TOKEN,
              REFRESH_TOKEN,
              EXPIRES_TOKEN,
              AVATAR,
              PERMISSIONS,
              ACCEPT_TERMS,
            ],
            () => {
              props.navigation.dispatch(StackActions.push('Login'));
              // props.navigation.navigate('Login');
            },
          );
        });
    } catch (err) {
      // Erro
    }
  }, []);

  const editUserData = useCallback(
    data => {
      dispatch(UserActions.personUpdate({ ...data }));

      setEditMode(!editMode);
    },
    [userData, dispatch],
  );

  const setUserData = useCallback(
    async value => await dispatch(UserActions.personEdit(value)),
    [UserActions, dispatch],
  );

  const openLink = useCallback(link => {
    let url = 'https://plataforma.advise.com.br/';
    url +=
      link === 'termos' ? 'termos-e-condicoes' : 'politicas-de-privacidade';

    Linking.openURL(url).catch(err => {
      // Não foi possível acessar o link
    });
  }, []);

  const choosePicture = useCallback(() => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: true,
      },
      response => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          const asset = response.assets[0];
          let extension = asset.type ? asset.type.replace('image/', '') : 'jpg';

          if (extension === 'jpeg') extension = 'jpg';

          const data = {
            extensao: '.' + extension,
            foto: asset.base64,
          };

          dispatch(UserActions.updateProfile({ ...data }));
        }
      },
    );
  }, []);

  const renderImage = useMemo(
    () => (
      <ProfileImageContainer>
        <ProfileImageButton
          onPress={() => choosePicture()}
          active={picture ? true : false}
        >
          <ProfileImage
            source={{ uri: `data:image/png;charset=utf-8;base64,${picture}` }}
          />
        </ProfileImageButton>
      </ProfileImageContainer>
    ),
    [picture],
  );

  const handleShowTermsOfUse = useCallback(() => {
    props.navigation.dispatch(
      StackActions.push('TermsUse', {
        previous_screen: 'Infos',
      }),
    );
  }, []);

  const handleShowPolicyPrivacy = useCallback(() => {
    props.navigation.dispatch(StackActions.push('PrivacyPolicy'));
  }, []);

  return (
    <Container>
      <Warp>
        <PickerContainer>
          <RNPickerSelect
            style={scenePickerSelectStyles}
            onValueChange={value => setScene(value)}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            doneText="Selecionar"
            value={scene}
            items={scenes}
            Icon={() => (
              <MaterialIcons name="arrow-drop-down" size={18} color="gray" />
            )}
          />
        </PickerContainer>
        <ProfileContainer>
          {scene === 'user' ? (
            <>
              {loading ? (
                <Spinner height={50} />
              ) : (
                <>
                  {renderImage}
                  <InfoContainer>
                    <InfoTitle>Nome</InfoTitle>
                    <InfoValue
                      editable={editMode}
                      onChangeText={value =>
                        setUserData({ data: { ...userData.data, nome: value } })
                      }
                      value={userData.data.nome || 'Não informado'}
                    />
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Gênero</InfoTitle>
                    <InfoCustomValue editable={editMode}>
                      <RNPickerSelect
                        placeholder={{}}
                        disabled={!editMode}
                        doneText="Selecionar"
                        style={pickerSelectStyles}
                        value={userData.data.idSexo}
                        onValueChange={value =>
                          setUserData({
                            data: { ...userData.data, idSexo: value },
                          })
                        }
                        useNativeAndroidPickerStyle={false}
                        items={[
                          {
                            label: 'Masculino',
                            value: -1,
                          },
                          {
                            label: 'Feminino',
                            value: -2,
                          },
                          {
                            label: 'Não informar',
                            value: -3,
                          },
                        ]}
                      />
                    </InfoCustomValue>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Telefone</InfoTitle>
                    <InfoValue
                      editable={editMode}
                      keyboardType="phone-pad"
                      value={userData.data.fone1 || 'Não informado'}
                      onChangeText={value =>
                        setUserData({
                          data: { ...userData.data, fone1: value },
                        })
                      }
                    />
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Data de nascimento</InfoTitle>
                    <Datepicker
                      enabled={editMode}
                      style={{ flex: 1 }}
                      customStyles={DateStyle({
                        editable: editMode,
                        colors: colors,
                      })}
                      date={selectedDate}
                      title="Data inválida"
                      onDateChange={date => {
                        // date vem como objeto Date do DatePicker
                        setSelectedDate(date);
                        // Converte o Date object para string no formato DD/MM/YYYY e depois para o formato esperado pelo backend
                        const dateString = FormatDateBR(date);
                        setUserData({
                          data: {
                            ...userData.data,
                            dataNascimentoAbertura:
                              FormatFullDateEN(dateString),
                          },
                        });
                      }}
                    />
                  </InfoContainer>
                  {userData.oab && [
                    <InfoContainer key={1}>
                      <InfoTitle>N° da OAB</InfoTitle>
                      <InfoValue
                        editable={editMode}
                        keyboardType="numeric"
                        value={userData.oab.numero || 'Não informado'}
                        onChangeText={value =>
                          setUserData({
                            oab: { ...userData.oab, numero: value },
                          })
                        }
                      />
                    </InfoContainer>,
                    <InfoContainer key={2}>
                      <InfoTitle>UF da OAB</InfoTitle>
                      <InfoCustomValue editable={editMode}>
                        <RNPickerSelect
                          style={pickerSelectStyles}
                          onValueChange={value =>
                            setUserData({
                              oab: { ...userData.oab, idUF: value },
                            })
                          }
                          placeholder={{}}
                          doneText="Selecionar"
                          value={userData.oab.idUF}
                          useNativeAndroidPickerStyle={false}
                          disabled={!editMode}
                          items={ufs}
                        />
                      </InfoCustomValue>
                    </InfoContainer>,
                    <InfoContainer key={3}>
                      <InfoTitle>Tipo da OAB</InfoTitle>
                      <InfoCustomValue editable={editMode}>
                        <RNPickerSelect
                          style={pickerSelectStyles}
                          onValueChange={value =>
                            setUserData({
                              oab: { ...userData.oab, idTipoOAB: value },
                            })
                          }
                          placeholder={{}}
                          doneText="Selecionar"
                          value={userData.oab.idTipoOAB}
                          disabled={!editMode}
                          useNativeAndroidPickerStyle={false}
                          items={oabTypes}
                        />
                      </InfoCustomValue>
                    </InfoContainer>,
                  ]}
                  <InfoContainer>
                    <InfoTitle>Email</InfoTitle>
                    <InfoValue
                      editable={editMode}
                      keyboardType="email-address"
                      value={userData.data.email || 'Não informado'}
                      onChangeText={value =>
                        setUserData({
                          data: { ...userData.data, email: value },
                        })
                      }
                    />
                  </InfoContainer>
                </>
              )}
              <InfoContainer>
                <InfoTitle>Legal</InfoTitle>
                <InfoContent>
                  <InfoLink
                    onPress={() => {
                      handleShowTermsOfUse();
                    }}
                  >
                    <InfoLinkText>Termos de uso</InfoLinkText>
                  </InfoLink>
                  <InfoText> e </InfoText>
                  <InfoLink
                    onPress={() => {
                      handleShowPolicyPrivacy();
                    }}
                  >
                    <InfoLinkText>Política de Privacidade</InfoLinkText>
                  </InfoLink>
                </InfoContent>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Cancelar contrato</InfoTitle>
                <InfoText>
                  Entre em contato para realizar o pedido de cancelamento do
                  contrato em vigência.
                </InfoText>
              </InfoContainer>

              <ButtonLogout onPress={logoutUser}>
                <LogoutText>Sair do aplicativo</LogoutText>
              </ButtonLogout>
            </>
          ) : (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <InfoContainer>
                    <InfoTitle>Nome</InfoTitle>
                    <InfoText>
                      {customerData.pessoaCliente?.nome || 'Não informado'}
                    </InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Documento</InfoTitle>
                    <InfoText>
                      {customerData.pessoaCliente?.cpfcnpj || 'Não informado'}
                    </InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>CEP</InfoTitle>
                    <InfoText>
                      {customerData.pessoaCliente?.cep || 'Não informado'}
                    </InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Endereco</InfoTitle>
                    <InfoText>
                      {customerData.pessoaCliente?.logradouro ||
                        'Não informado'}
                    </InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Telefone</InfoTitle>
                    <InfoText>
                      {customerData.pessoaCliente?.fone1 || 'Não informado'}
                    </InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Complemento</InfoTitle>
                    <InfoText>
                      {customerData.pessoaCliente?.complementoEndereco ||
                        'Não informado'}
                    </InfoText>
                  </InfoContainer>
                </>
              )}
            </>
          )}
        </ProfileContainer>
      </Warp>
    </Container>
  );
};

const stylesPickerSelectStyles = colors =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      color: colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
    },
    inputAndroid: {
      flex: 1,
      height: 22,
      marginTop: 5,
      lineHeight: 1,
      padding: 0,
      fontSize: 14,
      color: colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
      minWidth: 400,
    },
  });

const stylesScenePickerSelectStyles = colors =>
  StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      color: colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
    },
    inputAndroid: {
      height: 20,
      padding: 0,
      fontSize: 16,
      color: colors.fadedBlack,
      fontFamily: fonts.circularStdBook,
      minWidth: 400,
    },
  });

export default Infos;
