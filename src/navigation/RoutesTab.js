import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Image } from 'react-native'
import { colors } from 'assets/styles';

// Pages
import Blank from '../pages/Blank';
import Folders from '../pages/Folders';
import Login from '../pages/Login';
import People from '../pages/People';
import Jurisprudence from '../pages/Jurisprudence';
import Account from '../pages/Account';
import Deadlines from '../pages/Deadlines';

//Custom Icons
import UserIcon from 'components/UserIcon';
const IconLogo = require('assets/images/logoIcon.png');

const arr = [];
AsyncStorage.getItem('@IdProdutoAdvise').then((item) => arr.push(item));

const avatar = AsyncStorage.getItem('@Advise:avatar');

const RoutesTab = createBottomTabNavigator(
  {
    // Dashboard: {
    //   screen: Blank,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <Image
    //         source={IconLogo}
    //         style={{ width: 24, height: 24, tintColor: tintColor }}
    //       />
    //     ),
    //   }),
    // },
    // Main2: {
    //   screen: People,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <MaterialIcons name="person" size={25} color={tintColor} />
    //     ),
    //   }),
    // },
    Folders: {
      screen: Folders,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="bolt" size={23} color={tintColor} />
        ),
      }),
    },
    // Main3: {
    //   screen: Blank,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({ tintColor }) => (
    //       <MaterialIcons name="attach-money" size={25} color={tintColor} />
    //     ),
    //   }),
    // },
    Deadlines: {
      screen: Deadlines,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="event" size={25} color={tintColor} />
        ),
      }),
    },
    Jurisprudence: {
      screen: Jurisprudence,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="gavel" size={25} color={tintColor} />
        ),
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <UserIcon color={tintColor} />
        ),
      }),
    },

  },
  {
    tabBarOptions: {
      showLabel: false,
      scrollEnabled: true,
      activeTintColor: colors.advise,
      inactiveTintColor: colors.grayLight,
      inactiveBackgroundColor: colors.white,
      activeBackgroundColor: colors.white,
      indicatorStyle: {
        backgroundColor: colors.white,
      },
      tabStyle: {
        width: 60
      },
      style: {
        backgroundColor: colors.white,
        height: 64,
        marginBottom: -2,
      },
    },
    initialRouteName: 'Folders',
    tabBarPosition: 'top',
    swipeEnabled: false,
    animationEnabled: true,
  }
);

export default RoutesTab;
