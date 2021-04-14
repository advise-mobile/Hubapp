import React, { useState, useCallback, useEffect } from 'react';
import { Appearance, Keyboard } from 'react-native';
import ToastNotifyActions from 'store/ducks/ToastNotify';

import { useDispatch } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PermissionsGroups, checkPermission } from 'helpers/Permissions';

import Header from 'components/Header';
import HasNotPermission from 'components/HasNotPermission';

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

const permissionImage = (colorScheme == 'dark') ? require('assets/images/permissions/jurisprudence_white.png') : require('assets/images/permissions/jurisprudence.png');
const image = (colorScheme == 'dark') ? require('assets/images/jurisprudence_white.png') : require('assets/images/jurisprudence.png');

export default function Jurisprudence(props) {
  const [term, setTerm] = useState('');
  const [hasPermission, setPermission] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      return;
    })
  }, []);

  useEffect(() => { checkPermission(PermissionsGroups.JURISPRUDENCE).then(permission => setPermission(permission)) }, [props]);

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
        {hasPermission ?
          (<Content>
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
          </Content>) :
          (<Content>
            <HasNotPermission
              image={permissionImage}
              title={`O maior banco de\nJurisprudência do Brasil!`}
              body="Realize consultas jurisprudenciais dentro da sua solução de forma rápida e simples. Filtros inteligentes para consultar decisões que realmente importam para o seu caso"
            />
          </Content>)
        }
      </Warp>
    </Container>
  );
}
