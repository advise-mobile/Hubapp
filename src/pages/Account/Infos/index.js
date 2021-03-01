import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Linking, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

import Datepicker from 'components/DatePicker';
import Spinner from 'components/Spinner';
import UserActions from 'store/ducks/User';
import CustomerActions from 'store/ducks/Customer';
import AuthAction from 'store/ducks/Auth';

import { colors, fonts } from 'assets/styles';
import { Container, Warp, HeaderAction } from 'assets/styles/general';
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
  ButtonLogout,
  LogoutText
} from './styles';

import { FormatDateBR, FormatFullDateEN } from 'helpers/DateFunctions';
import { disableNotificationDevice } from 'helpers/Pushs';

export default Infos = props => {
  const [scene, setScene] = useState('user');
  const [editMode, setEditMode] = useState(false);
  const loading = useSelector(state => state.user.loading);
  const userData = useSelector(state => state.user);
  const customerData = useSelector(state => state.customer.data);

  const oabTypes = useSelector(state => state.user.typesOAB.map(type => {
    return {
      value: type.id,
      label: type.nome
    }
  }));

  const ufs = useSelector(state => state.user.ufs.map(state => {
    return {
      value: state.id,
      label: state.nome
    }
  }));

  const scenes = [
    {
      label: "Dados do perfil",
      value: "user",
    },
    {
      label: "Dados do contratante",
      value: "hirer",
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.selected) return;

    props.setCustomActions(
      <HeaderAction key={1}>
        <MaterialIcons name={editMode ? "check" : "edit"} size={20} color={colors.fadedBlack} onPress={() => editMode ? editUserData(userData) : setEditMode(!editMode)} />
      </HeaderAction >
    );
  }, [props.selected]);

  useEffect(() => {
    props.setCustomActions(
      <HeaderAction key={1}>
        <MaterialIcons name={editMode ? "check" : "edit"} size={20} color={colors.fadedBlack} onPress={() => editMode ? editUserData(userData) : setEditMode(!editMode)} />
      </HeaderAction >
    );
  }, [editMode, userData]);

  useEffect(() => {
    dispatch(UserActions.personRequest());

    dispatch(CustomerActions.customerRequest());
  }, []);

  const logout = useCallback(async () => {
    dispatch(AuthAction.logoutRequest());

    disableNotificationDevice().then(() => AsyncStorage.clear(() => props.navigation.navigate('Login')));
  }, []);

  const editUserData = useCallback(data => {
    dispatch(UserActions.personUpdate({ ...data }));

    setEditMode(!editMode);
  }, [userData, dispatch]);

  const setUserData = useCallback(async value => await dispatch(UserActions.personEdit(value)), [UserActions, dispatch]);

  const openLink = useCallback(link => {
    let url = "https://plataforma.advise.com.br/";
    url += (link === "termos") ? "termos-e-condicoes" : "politicas-de-privacidade";

    Linking.openURL(url).catch(err => console.error('Não foi possível acessar o link.', err));
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
      (response) => {
        if (!response.didCancel) {
          let extension = response.type.replace('image/', '');

          if (extension === 'jpeg') extension = 'jpg';

          const data = {
            extensao: '.' + extension,
            foto: response.base64,
          };

          dispatch(UserActions.updateProfile({ ...data }));
        }
      },
    )
  }, []);

  return (
    <Container>
      <Warp>
        <PickerContainer>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={value => setScene(value)}
            placeholder={{}}
            doneText="Selecionar"
            value={scene}
            items={scenes}
            Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="gray" />}
          />
        </PickerContainer>
        <ProfileContainer>
          {scene === 'user' ?
            <>
              {loading ? <Spinner height={50} /> :
                <>
                  <ProfileImageContainer>
                    <ProfileImageButton onPress={() => choosePicture()} active={userData.data.foto ? true : false}>
                      <ProfileImage source={{ uri: `data:image/png;charset=utf-8;base64,${userData.data.foto}` }} />
                    </ProfileImageButton>
                  </ProfileImageContainer>
                  <InfoContainer>
                    <InfoTitle>Nome</InfoTitle>
                    <InfoValue
                      editable={editMode}
                      onChangeText={value => setUserData({ data: { ...userData.data, nome: value } })}
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
                        onValueChange={value => setUserData({ data: { ...userData.data, idSexo: value } })}
                        items={[
                          {
                            label: "Masculino",
                            value: -1,
                          },
                          {
                            label: "Feminino",
                            value: -2,
                          },
                          {
                            label: "Não informar",
                            value: -3,
                          }
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
                      onChangeText={value => setUserData({ data: { ...userData.data, fone1: value } })}
                    />
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Data de nascimento</InfoTitle>
                    <Datepicker
                      enabled={editMode}
                      date={FormatDateBR(userData.data.dataNascimentoAbertura)}
                      onDateChange={date => setUserData({ data: { ...userData.data, dataNascimentoAbertura: FormatFullDateEN(date) } })}
                    />
                  </InfoContainer>
                  {userData.oab && [
                    (<InfoContainer key={1}>
                      <InfoTitle>N° da OAB</InfoTitle>
                      <InfoValue
                        editable={editMode}
                        keyboardType="numeric"
                        value={userData.oab.numero || 'Não informado'}
                        onChangeText={value => setUserData({ oab: { ...userData.oab, numero: value } })}
                      />
                    </InfoContainer>),
                    (<InfoContainer key={2}>
                      <InfoTitle>UF da OAB</InfoTitle>
                      <InfoCustomValue editable={editMode}>
                        <RNPickerSelect
                          style={pickerSelectStyles}
                          onValueChange={value => setUserData({ oab: { ...userData.oab, idUF: value } })}
                          placeholder={{}}
                          doneText="Selecionar"
                          value={userData.oab.idUF}
                          disabled={!editMode}
                          items={ufs}
                        />
                      </InfoCustomValue>
                    </InfoContainer>),
                    (<InfoContainer key={3}>
                      <InfoTitle>Tipo da OAB</InfoTitle>
                      <InfoCustomValue editable={editMode}>
                        <RNPickerSelect
                          style={pickerSelectStyles}
                          onValueChange={value => setUserData({ oab: { ...userData.oab, idTipoOAB: value } })}
                          placeholder={{}}
                          doneText="Selecionar"
                          value={userData.oab.idTipoOAB}
                          disabled={!editMode}
                          items={oabTypes}
                        />
                      </InfoCustomValue>
                    </InfoContainer>)
                  ]}
                  <InfoContainer>
                    <InfoTitle>Email</InfoTitle>
                    <InfoValue
                      editable={editMode}
                      keyboardType="email-address"
                      value={userData.data.email || 'Não informado'}
                      onChangeText={value => setUserData({ data: { ...userData.data, email: value } })}
                    />
                  </InfoContainer>
                </>
              }
              <InfoContainer>
                <InfoTitle>Legal</InfoTitle>
                <InfoLink onPress={() => openLink("termos")}>
                  <InfoLinkText>Termos de uso</InfoLinkText>
                </InfoLink>
                <InfoText> e </InfoText>
                <InfoLink onPress={() => openLink("politica")}>
                  <InfoLinkText>Política de Privacidade</InfoLinkText>
                </InfoLink>
              </InfoContainer>
              <InfoContainer>
                <InfoTitle>Cancelar contrato</InfoTitle>
                <InfoText>Entre em contato para realizar o pedido de cancelamento do contrato em vigência.</InfoText>
              </InfoContainer>

              <ButtonLogout onPress={() => logout()}>
                <LogoutText>Sair do aplicativo</LogoutText>
              </ButtonLogout>
            </>
            :
            <>
              {loading ? <Spinner /> :
                <>
                  <InfoContainer>
                    <InfoTitle>Nome</InfoTitle>
                    <InfoText>{customerData.pessoaCliente?.nome || 'Não informado'}</InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Documento</InfoTitle>
                    <InfoText>{customerData.pessoaCliente?.cpfcnpj || 'Não informado'}</InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>CEP</InfoTitle>
                    <InfoText>{customerData.pessoaCliente?.cep || 'Não informado'}</InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Endereco</InfoTitle>
                    <InfoText>{customerData.pessoaCliente?.logradouro || 'Não informado'}</InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Telefone</InfoTitle>
                    <InfoText>{customerData.pessoaCliente?.fone1 || 'Não informado'}</InfoText>
                  </InfoContainer>
                  <InfoContainer>
                    <InfoTitle>Complemento</InfoTitle>
                    <InfoText>{customerData.pessoaCliente?.complementoEndereco || 'Não informado'}</InfoText>
                  </InfoContainer>
                </>
              }
            </>
          }
        </ProfileContainer>
      </Warp>
    </Container>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: colors.fadedBlack,
    fontFamily: fonts.circularStdBook,
  },
  inputAndroid: {
    height: 20,
    fontSize: 16,
    color: colors.fadedBlack,
    fontFamily: fonts.circularStdBook,
    minWidth: 400,
  },
});
