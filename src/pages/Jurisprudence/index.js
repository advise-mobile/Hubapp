import React, { useState, useCallback } from 'react';
import { Appearance, Keyboard } from 'react-native';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { useDispatch } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from 'components/Header';

import { Container, Warp } from 'assets/styles/general';
import {
  Content,
  Image,
  Title,
  Subtitle,
  SearchBar,
  SearchInput,
  SearchButton,
  ActionButton,
  ActionButtonText,
} from './styles';

import { colors } from 'assets/styles';

const colorScheme = Appearance.getColorScheme();

const image = (colorScheme == 'dark') ? require('assets/images/jurisprudence_white.png') : require('assets/images/jurisprudence.png');

export default function Jurisprudence(props) {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const searchKeyword = useCallback(() => {
    if (term.length < 3) {
      dispatch(
        ToastNotifyActions.toastNotifyShow(
          'O termo deve ter ao menos 3 caracteres.',
          true
        )
      );

      return;
    }

    Keyboard.dismiss();
    props.navigation.navigate('JurisprudenceList', { term: term });
    setTerm('');
    return;
  }, [term]);

  return (
    <Container>
      <Warp>
        <Header title='Jurisprudência' />
        <Content>
          <Image source={image} />
          <Title>Jurisprudência</Title>
          <Subtitle>Consulta ao conjunto de decisões dos tribunais brasileiros publicadas desde 1988.</Subtitle>
          <SearchBar>
            <SearchInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder='Digite o que deseja buscar'
              placeholderTextColor={colors.grayLight}
              value={term}
              onChangeText={typedSearch => setTerm(typedSearch)}
              onSubmitEditing={searchKeyword}
              returnKeyType='search'
            />
            <SearchButton onPress={() => searchKeyword()}>
              <MaterialIcons size={20} name="search" color={colors.fadedBlack} />
            </SearchButton>
          </SearchBar>
          <ActionButton onPress={searchKeyword}>
            <ActionButtonText>Buscar jurisprudência</ActionButtonText>
          </ActionButton>
        </Content>
      </Warp>
    </Container>
  );
}
