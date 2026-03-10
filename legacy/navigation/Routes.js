// Imports antigos removidos - React Navigation v6
import React from 'react';

import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from '@lnavigation/NavigationService';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from '@lcomponents/UserIcon';
import CustomIcon from '@lcomponents/CustomIcon';

// Intro importada do código principal (src/pages), não do legado
import Intro from '@pages/Intro';
import Login from '@lpages/Login';
import Initial from '@lpages/Initial';
import Forgot from '@lpages/Forgot';
import Client from '@lpages/Client';

import Account from '@lpages/Account';
import Chat from '@lpages/Account/Chat';

import Pushs from '@lpages/Account/Notifications/Pushs';
import Emails from '@lpages/Account/Notifications/Emails';
import PrivacyPolicy from '@lpages/PrivacyPolicy';

import Folders from '@lpages/Folders';
import Movements from '@lpages/Movements';
import MovementDetail from '@lpages/Movements/Details';
import MovementsTrash from '@pages/MovementsTrash';

// Páginas TypeScript estão em src/pages (usam @pages sem 'l')
import Finance from '@pages/Finance';
import Details from '@pages/Finance/Details';
import CashFlow from '@pages/Finance/CashFlow';
import Category from '@pages/Finance/Category';

import Deadlines from '@lpages/Deadlines';
import DeadlinesDetails from '@lpages/Deadlines/Details';

import TermsUse from '@lpages/TermsUse';

import { PermissionsGroups } from '@lhelpers/Permissions';

import { useTheme } from 'styled-components';

const MainStack = createStackNavigator();

const TabsStack = createBottomTabNavigator();

const FoldersStack = createStackNavigator();

const FinanceStack = createStackNavigator();

const FoldersScreens = () => (
  <FoldersStack.Navigator screenOptions={{ headerShown: false }}>
    <FoldersStack.Screen name="Folders" component={Folders} />
    <FoldersStack.Screen name="Movements" component={Movements} />
    <FoldersStack.Screen name="MovementsTrash" component={MovementsTrash} />
    <FoldersStack.Screen name="MovementDetail" component={MovementDetail} />
  </FoldersStack.Navigator>
);

const FinanceScreens = () => (
  <FinanceStack.Navigator screenOptions={{ headerShown: false }}>
    <FinanceStack.Screen name="Finance" component={Finance} />
    <FinanceStack.Screen name="Details" component={Details} />
    <FinanceStack.Screen name="CashFlow" component={CashFlow} />
    <FinanceStack.Screen name="Category" component={Category} />
  </FinanceStack.Navigator>
);

const DeadlinesStack = createStackNavigator();
const DeadlinesScreens = () => (
  <DeadlinesStack.Navigator screenOptions={{ headerShown: false }}>
    <DeadlinesStack.Screen name="Deadlines" component={Deadlines} />
    <DeadlinesStack.Screen
      name="DeadlinesDetails"
      component={DeadlinesDetails}
    />
  </DeadlinesStack.Navigator>
);

const AccountStack = createStackNavigator();
const AccountScreens = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="Account" component={Account} />
    <AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <AccountStack.Screen name="Chat" component={Chat} />
    <AccountStack.Screen name="Emails" component={Emails} />
    <AccountStack.Screen name="Pushs" component={Pushs} />
  </AccountStack.Navigator>
);

const AppScreens = () => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();

  return (
    <TabsStack.Navigator
      initialRouteName="Folders"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: colorUseTheme.colors.advise,
        tabBarInactiveTintColor: colorUseTheme.colors.grayLight,
        tabBarInactiveBackgroundColor: colorUseTheme.colors.white,
        tabBarActiveBackgroundColor: colorUseTheme.colors.white,
        tabBarItemStyle: {
          width: 60,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          backgroundColor: colorUseTheme.colors.white,
          height: Platform.OS == 'android' ? 64 : 80,
          paddingTop: Platform.OS == 'android' ? 8 : 16,
          paddingBottom: Platform.OS == 'android' ? 8 : 20,
          marginBottom: -2,
        },
      }}
    >
      <TabsStack.Screen
        component={FoldersScreens}
        name="Folders"
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcon group={PermissionsGroups.MOVEMENTS}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={25}
                color={color}
              />
            </CustomIcon>
          ),
        }}
      />
      <TabsStack.Screen
        component={DeadlinesScreens}
        name="Deadlines"
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcon group={PermissionsGroups.SCHEDULE}>
              <MaterialIcons name="event" size={25} color={color} />
            </CustomIcon>
          ),
        }}
      />

      <TabsStack.Screen
        component={FinanceScreens}
        name="Finance"
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcon group={PermissionsGroups.FINANCES}>
              <MaterialIcons name="attach-money" size={25} color={color} />
            </CustomIcon>
          ),
        }}
      />

      <TabsStack.Screen
        component={AccountScreens}
        name="Account"
        options={{
          tabBarIcon: ({ color }) => (
            <CustomIcon group={PermissionsGroups.ACCOUNT}>
              <UserIcon color={color} />
            </CustomIcon>
          ),
        }}
      />
    </TabsStack.Navigator>
  );
};

const MainScreens = () => (
  <MainStack.Navigator
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <MainStack.Screen name="Initial" component={Initial} />
    <MainStack.Screen name="TermsUse" component={TermsUse} />
    <MainStack.Screen name="Intro" component={Intro} />
    <MainStack.Screen name="Login" component={Login} />
    <MainStack.Screen name="Forgot" component={Forgot} />
    <MainStack.Screen name="Client" component={Client} />
    <MainStack.Screen name="App" component={AppScreens} />
  </MainStack.Navigator>
);

const Routes = () => (
  <NavigationContainer ref={navigationRef}>
    <MainScreens />
  </NavigationContainer>
);

export default Routes;
