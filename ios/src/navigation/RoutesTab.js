import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { AsyncStorage } from '@react-native-community/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'assets/styles';

// Pages
import Publications from '../pages/Main';
import Jurisprudence from '../pages/Jurisprudence';
import Process from '../pages/Process';
import Account from '../pages/Account';

const arr = [];
AsyncStorage.getItem('@IdProdutoAdvise').then((item) => arr.push(item));

const RoutesTab = createBottomTabNavigator(
  {
    Main: {
      screen: Publications,
      navigationOptions: () => ({
        tabBarLabel: 'Publicações',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="file-text" size={23} color={tintColor} />
        ),
      }),
    },

    Process: {
      screen: Process,
      navigationOptions: () => ({
        tabBarLabel: 'Processos',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="book" size={25} color={tintColor} />
        ),
      }),
    },
    /*Jurisprudence: {
      screen: Jurisprudence,
      navigationOptions: () => ({
        tabBarLabel: 'Jurisprudência',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="gavel" size={25} color={tintColor} />
        ),
      }),
    },*/
    Account: {
      screen: Account,
      navigationOptions: () => ({
        tabBarLabel: 'Meus Dados',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="account-circle" size={25} color={tintColor} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      shifting: true,
      activeTintColor: colors.backgroundButton,
      inactiveTintColor: colors.grayLight,
      inactiveBackgroundColor: colors.white,
      activeBackgroundColor: colors.white,
      tabBarVisible: false,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: colors.white,
      },
      style: {
        backgroundColor: colors.white,
        height: 56,
        marginBottom: -2,
      },
      upperCaseLabel: false,
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
  }
);

export default RoutesTab;
