import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Linking, Appearance, KeyboardAvoidingView, Platform } from 'react-native';

import sendLead from 'helpers/RD';

import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from 'components/Header';

import {
  Content,
  ContentRow,
  Heading,
  Title,
  Button,
  Description,
  Option,
  OptionButton,
  OptionText,
  ModalContent,
  Infos,
  ModalHeading,
  ModalTitle,
  ModalSubtitle,
  ModalOptionText,
  ModalOptionButton,
  Attendance,
  AttendanceTitle,
  AttendanceText,
  HelpContainer,
  HelpText,
  Row,
  Label,
  Input,
  Submit,
  SubmitText,
  SuccessContent,
  Image,
  SuccessTitle,
  SuccessDescription,
} from './styles';

import { Container, Warp } from 'assets/styles/general';
import { colors } from 'assets/styles';

const colorScheme = Appearance.getColorScheme();

const image = (colorScheme == 'dark') ? require('assets/images/icons/email_white.png') : require('assets/images/icons/email.png');

const Client = props => {
  const { control, handleSubmit } = useForm();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [sended, setSended] = useState(false);
  const [sending, setSending] = useState(false);

  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const [isCallModalVisible, setCallModalVisible] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const toggleCallModal = useCallback(() => setCallModalVisible(!isCallModalVisible), [isCallModalVisible]);
  const toggleHelpModal = useCallback(() => setHelpModalVisible(!isHelpModalVisible), [isHelpModalVisible]);
  const toggleContactModal = useCallback(() => {
    setContactModalVisible(!isContactModalVisible);

    setSending(false);
    setSended(false);

    setName('');
    setEmail('');
    setPhone('');

    setNameErr(false);
    setEmailErr(false);
    setPhoneErr(false);

  }, [isContactModalVisible]);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isErrors = useCallback(() => {
    setNameErr(name.length < 2);

    setEmailErr(!validateEmail(email));

    setPhoneErr(phone.length < 2);
  }, [name, email, phone]);

  const maskPhone = useCallback(phone => {
    phone = phone.replace(/\D/g, "");
    phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
    phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");

    return phone.substring(0, 15);
  }, []);

  const onSubmit = useCallback((data) => {
    const errors = Object.keys(data).map(key => data[key]).some(value => value == null || value == '');

    isErrors();

    if (!errors) {
      setSending(true);

      sendLead('nameFormHub', {
        ...data,
        page_title: 'APP - Ainda não sou cliente',
      })
        .then(() => setSending(false))
        .finally(() => setSended(true));
    }
  }, [name, email, phone]);

  return (
    <Container>
      <Header title={''} back={() => props.navigation.goBack()} />
      <Warp>
        <Content>
          <ContentRow>
            <Heading>
              <Title>Ainda não sou cliente</Title>
              <Button onPress={toggleHelpModal}>
                <Icon name={'help'} size={20} color={colors.fadedBlack} />
              </Button>
            </Heading>
            <Description>
              Para usar o aplicativo é necessário entrar em contato com a Advise. Escolha como quer falar com a gente!
            </Description>
          </ContentRow>
          <ContentRow>
            <OptionButton onPress={toggleCallModal}>
              <Option>
                <Icon name={"phone"} size={20} color={colors.fadedBlack} />
                <OptionText>Quero ligar para a Advise</OptionText>
              </Option>
            </OptionButton>
          </ContentRow>
          <ContentRow>
            <OptionButton onPress={toggleContactModal}>
              <Option>
                <Icon name={"mail"} size={20} color={colors.fadedBlack} />
                <OptionText>Quero informar meu contato</OptionText>
              </Option>
            </OptionButton>
          </ContentRow>
        </Content>
      </Warp>
      <Modal isVisible={isCallModalVisible} onBackdropPress={toggleCallModal} style={{ justifyContent: 'flex-start' }}>
        <ModalContent device={Platform.OS}>
          <Infos>
            <ModalHeading>
              <ModalTitle>Ligue para a Advise</ModalTitle>
              <Button onPress={toggleCallModal}>
                <Icon name={"close"} size={22} color={colors.grayDarker} />
              </Button>
            </ModalHeading>
            <Description>Escolha como prefere ligar de acordo com a sua região.</Description>

            <ModalSubtitle>Capitais e regiões metropolitanas</ModalSubtitle>
            <ModalOptionButton onPress={() => Linking.openURL('tel:40033196')}>
              <Option>
                <Icon name={"phone"} size={22} color={colors.advise} />
                <ModalOptionText>4003 3196</ModalOptionText>
              </Option>
            </ModalOptionButton>

            <ModalSubtitle>Demais regiões</ModalSubtitle>
            <ModalOptionButton onPress={() => Linking.openURL('tel:08005009926')}>
              <Option>
                <Icon name={"phone"} size={22} color={colors.advise} />
                <ModalOptionText>0800 500 9926</ModalOptionText>
              </Option>
            </ModalOptionButton>
          </Infos>
          <Attendance>
            <AttendanceTitle>Horário de atendimento</AttendanceTitle>
            <AttendanceText>Segunda a quinta: 8:00 às 18:00</AttendanceText>
            <AttendanceText>Sexta: 8:00 às 17:30, exceto feriados</AttendanceText>
          </Attendance>
        </ModalContent>
      </Modal>
      <Modal isVisible={isHelpModalVisible} onBackdropPress={toggleHelpModal} style={{ justifyContent: 'flex-start' }}>
        <ModalContent device={Platform.OS}>
          <Infos>
            <HelpContainer>
              <HelpText>Para contratar os produtos Advise é necessário entrar em contato com um de nossos consultores. Contamos com uma equipe comercial especializada para te atender e apresentar a melhor solução para a sua rotina jurídica.</HelpText>
              <Button onPress={toggleHelpModal}>
                <Icon name={"close"} size={22} color={colors.grayDarker} />
              </Button>
            </HelpContainer>
          </Infos>
        </ModalContent>
      </Modal>
      <Modal
        avoidKeyboard={true}
        isVisible={isContactModalVisible}
        onBackdropPress={toggleContactModal}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : "position"}>
          <ModalContent>
            {sended ?
              <Infos>
                <ModalHeading>
                  <ModalTitle></ModalTitle>
                  <Button onPress={toggleContactModal}>
                    <Icon name={"close"} size={22} color={colors.grayDarker} />
                  </Button>
                </ModalHeading>
                <SuccessContent>
                  <Image source={image} />
                  <SuccessTitle>Seu contato foi recebido!</SuccessTitle>
                  <SuccessDescription>Seus dados foram enviados com sucesso.{'\n'}Em breve um de nossos consultores entrará em contato!</SuccessDescription>
                </SuccessContent>
              </Infos>
              :
              <Infos>
                <ModalHeading>
                  <ModalTitle>Informe seu contato</ModalTitle>
                  <Button onPress={toggleContactModal}>
                    <Icon name={"close"} size={22} color={colors.grayDarker} />
                  </Button>
                </ModalHeading>

                <Description>Preencha seus dados abaixo para que possamos entrar em contato com você.</Description>
                <Row>
                  <Label error={nameErr}>Nome Completo</Label>
                  <Controller
                    name='nome'
                    control={control}
                    defaultValue={null}
                    rules={{ required: false }}
                    render={({ onChange }) => (
                      <Input
                        value={name}
                        ref={nameRef}
                        error={nameErr}
                        autoCorrect={false}
                        returnKeyType='next'
                        autoCapitalize='none'
                        placeholder='Nome Completo'
                        onSubmitEditing={() => emailRef.current.focus()}
                        placeholderTextColor={nameErr ? colors.red : colors.grayLight}
                        onChangeText={text => {
                          setName(text);
                          setNameErr(name.length < 2);
                          onChange(text);
                        }}
                      />
                    )}>
                  </Controller>
                </Row>
                <Row>
                  <Label error={emailErr}>Email</Label>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue={null}
                    rules={{ required: false }}
                    render={({ onChange }) => (
                      <Input
                        value={email}
                        ref={emailRef}
                        error={emailErr}
                        autoCorrect={false}
                        placeholder='Email'
                        returnKeyType='next'
                        autoCapitalize='none'
                        placeholderTextColor={emailErr ? colors.red : colors.grayLight}
                        onSubmitEditing={() => phoneRef.current.focus()}
                        onChangeText={text => {
                          setEmail(text);
                          setEmailErr(!validateEmail(email));
                          onChange(text);
                        }}
                      />
                    )}>
                  </Controller>
                </Row>
                <Row>
                  <Label error={phoneErr}>Celular</Label>
                  <Controller
                    name='phone'
                    control={control}
                    defaultValue={null}
                    rules={{ required: false }}
                    render={({ onChange }) => (
                      <Input
                        value={phone}
                        ref={phoneRef}
                        error={phoneErr}
                        maxLength={15}
                        autoCorrect={false}
                        autoCapitalize='none'
                        returnKeyType='done'
                        placeholder='Celular'
                        keyboardType="phone-pad"
                        placeholderTextColor={phoneErr ? colors.red : colors.grayLight}
                        onChangeText={text => {
                          setPhone(maskPhone(text));
                          setPhoneErr(phone.length < 2);
                          onChange(maskPhone(text));
                        }}
                      />
                    )}>
                  </Controller>
                </Row>
                <Submit disabled={sending} onPress={handleSubmit(onSubmit)} >
                  <SubmitText sending={sending}>{sending ? 'Enviando' : 'Enviar'}</SubmitText>
                </Submit>
              </Infos>
            }
          </ModalContent>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
}

export default Client;
