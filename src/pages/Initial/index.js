import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'components/Spinner';
import { Container, Warp } from 'assets/styles/general';

import { registerNotification } from 'helpers/Pushs';
import { TOKEN, INTRO, ACCEPT_TERMS } from 'helpers/StorageKeys';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import AuthActions from 'store/ducks/Auth';

import { getLogin } from 'services/Api';

import { exec } from 'helpers/VersionControl';

const VERSION = "1.1.2";

const Initial = props => {

  const dispatch = useDispatch();

  useEffect(() => { handleNavigationInit(); }, []);

  const handleNavigationInit = useCallback(async () => {
    await exec(VERSION);

    const intro = await AsyncStorage.getItem(INTRO);
    const token = await AsyncStorage.getItem(TOKEN);
    const acceptTerms = await AsyncStorage.getItem(ACCEPT_TERMS);

    dispatch(AuthActions.termsUseSuccess(JSON.parse(acceptTerms)));

    if (!intro) {
      props.navigation.navigate('Intro');
    } else {
      if (token) {
        getLogin().then(response => {
          if (!response) props.navigation.dispatch(StackActions.push('Login'));

          registerNotification();

          if (!JSON.parse(acceptTerms)) {
            props.navigation.dispatch(StackActions.push('TermsUse'));
          } else {
            props.navigation.dispatch(StackActions.push('App'));
          }

        });
      } else {
        props.navigation.dispatch(StackActions.push('Login'))
      }
    }
  }, []);

  return (
    <Container>
      <Warp>
        <Spinner />
      </Warp>
    </Container>
  );
}

export default Initial;
