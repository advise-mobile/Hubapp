import React, { useEffect } from 'react';
import Spinner from 'components/Spinner';
import { Container, Warp } from 'assets/styles/general';

import { registerNotification } from 'helpers/Pushs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const Initial = props => {

  useEffect(() => {
    AsyncStorage.multiGet(['@AdviseIntro', '@Advise:token'], (err, items) => {
      const intro = items[0][1];
      const token = items[1][1];

      if (!intro) {
        props.navigation.navigate('Intro');
      } else {
        if (token) {
          registerNotification();
          props.navigation.dispatch(StackActions.push('App'))

        } else {
          props.navigation.dispatch(StackActions.push('Login'))
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
