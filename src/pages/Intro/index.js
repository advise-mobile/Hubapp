import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
// import jwtDecode from 'jwt-decode';
// import OneSignal from 'react-native-onesignal';

import { colors } from 'assets/styles';
import { Container, Warp, Slide, Title, Icon, Image, Text, NextButton, ButtonText, SlideContainer } from './styles';
// import env from 'services/env';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TOKEN, INTRO } from 'helpers/StorageKeys';

const icon = require('assets/images/icon.png');

const slides = [
  {
    key: 'one',
    title: 'Unifique tarefas',
    text: 'Tenha acesso às informações de todos os tribunais e órgãos oficiais do país em um mesmo lugar',
    image: require('assets/images/intro/1.jpg'),
  },
  {
    key: 'two',
    title: 'Organize prazos',
    text: 'Gerencie seus prazos judiciais e compromissos no mesmo lugar. Tudo integrado à sua Google Agenda',
    image: require('assets/images/intro/2.jpg'),
  },
  {
    key: 'three',
    title: 'Jurisprudência',
    text: 'Faça consultas no maior banco de Jurisprudência do Brasil. Dados atualizados diariamente',
    image: require('assets/images/intro/3.jpg'),
  }
];

const styles = StyleSheet.create({
  inactiveDot: {
    display: 'none',
    backgroundColor: colors.grayLighter,
    width: 4,
    height: 4
  },
  activeDot: {
    display: 'none',
    backgroundColor: colors.grayDarker,
    width: 6,
    height: 6
  },
  icon: {
    width: 32,
    height: 27,
    marginTop: -32
  }
});

_keyExtractor = (item) => item.title;

const Intro = props => {
  const _renderItem = useCallback(({ item }) => (
    <Slide>
      <Icon source={icon} resizeMode="contain" style={styles.icon} />
      <Image source={item.image} resizeMode="contain" />
      <SlideContainer>
        <Title>{item.title}</Title>
        <Text>{item.text}</Text>
      </SlideContainer>
    </Slide>
  ), []);

  const _onDone = useCallback(() => {
    AsyncStorage.setItem(INTRO, 'true').then(() => {
      props.navigation.navigate('Login');
    });
  }, []);

  const _renderNextButton = useCallback(() => {
    return (
      <NextButton>
        <ButtonText>Próximo</ButtonText>
      </NextButton>
    );
  }, []);

  const _renderFinishButton = useCallback(() => {
    return (
      <NextButton>
        <ButtonText>Continuar</ButtonText>
      </NextButton>
    );
  }, []);

  // _checkAlreadySeen = async () => {
  //   // AsyncStorage.getItem('@AdviseIntro').then(seen => {
  //   //   seen && props.navigation.navigate('Login');
  //   // })
  //   // const token = await AsyncStorage.getItem(TOKEN);
  //   // if (token !== null) {
  //   //   const user = jwtDecode(token);
  //   //   OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
  //   //   props.navigation.navigate('Folders', { user });
  //   // }
  //   AsyncStorage.multiGet(['@AdviseIntro', TOKEN], (err, items) => {

  //     const intro = items[0][1];
  //     const token = items[1][1];

  //     if (intro) {
  //       if (token) {
  //         const user = jwtDecode(token);
  //         OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
  //         props.navigation.navigate('App', { user });

  //       } else {
  //         props.navigation.navigate('Login');
  //       }
  //     }
  //   });
  //   // AsyncStorage.getItem('@AdviseIntro').then(seen => {
  //   //   seen && props.navigation.navigate('Login');
  //   // })
  // }

  // _checkAlreadySeen();

  return (
    <Container>
      <Warp>
        <AppIntroSlider
          bottomButton
          data={slides}
          onDone={_onDone}
          showPrevButton={false}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          dotStyle={styles.inactiveDot}
          activeDotStyle={styles.activeDot}
          renderNextButton={_renderNextButton}
          renderDoneButton={_renderFinishButton}
        />
      </Warp>
    </Container>
  );
}

export default Intro;
