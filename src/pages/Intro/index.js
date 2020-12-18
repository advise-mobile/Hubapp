import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StyleSheet } from 'react-native';

import { Container, Warp, Slide, Title, Image, Text, NextButton, ButtonText, SlideContainer } from './styles';

import { colors } from 'assets/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Icon = require('assets/images/icon.png');

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
    backgroundColor: colors.grayLighter,
    width: 4,
    height: 4
  },
  activeDot: {
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

export default function Intro(props) {
  _renderItem = ({ item }) => {
    return (
      <Slide>
        <Image source={Icon} resizeMode="contain" style={styles.icon} />
        <Image source={item.image} resizeMode="contain" />
        <SlideContainer>
          <Title>{item.title}</Title>
          <Text>{item.text}</Text>
        </SlideContainer>
      </Slide>
    );
  };

  _onDone = () => {
    AsyncStorage.setItem('@AdviseIntro', 'true').then(() => {
      props.navigation.navigate('Login');
    });
  };

  _renderNextButton = () => {
    return (
      <NextButton>
        <ButtonText>Próximo</ButtonText>
      </NextButton>
    );
  };

  _renderFinishButton = () => {
    return (
      <NextButton>
        <ButtonText>Continuar</ButtonText>
      </NextButton>
    );
  };

  _checkAlreadySeen = async () => {
    AsyncStorage.getItem('@AdviseIntro').then(seen => {
      seen && props.navigation.navigate('Login');
    })
  }

  _checkAlreadySeen();

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
