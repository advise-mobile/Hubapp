import React, { useEffect } from 'react';
import Spinner from 'components/Spinner';
import { Container, Warp } from 'assets/styles/general';
import env from 'services/env';
import jwtDecode from 'jwt-decode';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Initial = props => {

  useEffect(() => {

    AsyncStorage.multiGet(['@AdviseIntro', '@Advise:token'], (err, items) => {

      const intro = items[0][1];
      const token = items[1][1];

      if (!intro) {
        props.navigation.navigate('Intro');
      } else {
        if (token) {
          const user = jwtDecode(token);
          OneSignal.init(env.oneSignalId, { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2 });
          props.navigation.navigate('App', { user });

        } else {
          props.navigation.navigate('Login');
        }
      }
    });
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
