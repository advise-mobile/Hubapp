import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '@lcomponents/Spinner';
import { Container, Warp } from '@lassets/styles/global';

import { registerNotification } from '@lhelpers/Pushs';
import { TOKEN, INTRO, ACCEPT_TERMS } from '@lhelpers/StorageKeys';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import AuthActions from '@lstore/ducks/Auth';

import { getLogin } from '@lservices/Api';

import { exec } from '@lhelpers/VersionControl';

const VERSION = '1.1.2';

const Initial = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleNavigationInit();
  }, []);

  const handleNavigationInit = useCallback(async () => {
    await exec(VERSION);

    const intro = await AsyncStorage.getItem(INTRO);
    const token = await AsyncStorage.getItem(TOKEN);
    const acceptTerms = await AsyncStorage.getItem(ACCEPT_TERMS);

    dispatch(AuthActions.termsUseSuccess(JSON.parse(acceptTerms), false));

    if (!intro) {
      props.navigation.navigate('Intro');
    } else {
      if (token) {
        getLogin().then(response => {
          if (!response) props.navigation.navigate('Login');

          registerNotification();

          if (!JSON.parse(acceptTerms)) {
            props.navigation.navigate('TermsUse');
          } else {
            props.navigation.navigate('App');
          }
        });
      } else {
        props.navigation.navigate('Login');
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
};

export default Initial;
