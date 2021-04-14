// import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserIcon from 'components/UserIcon';

import Intro from '../pages/Intro';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';

import Account from '../pages/Account';
import Notifications from '../pages/Account/Notifications';
import Pushs from '../pages/Account/Notifications/Pushs';
import Emails from '../pages/Account/Notifications/Emails';

import Folders from '../pages/Folders';
import Movements from '../pages/Movements';
import MovementDetail from '../pages/Movements/Details';

import Jurisprudence from '../pages/Jurisprudence';
import JurisprudenceList from '../pages/Jurisprudence/List';
import JurisprudenceDetail from '../pages/Jurisprudence/Details';

import Deadlines from '../pages/Deadlines';
import DeadlinesDetails from '../pages/Deadlines/Details';

import Initial from '../pages/Initial';

import { colors } from 'assets/styles';

const MainStack = createStackNavigator();

const TabsStack = createBottomTabNavigator();


const FoldersStack = createStackNavigator();
const FoldersScreens = () => (
  <FoldersStack.Navigator headerMode="none">
    <FoldersStack.Screen name="Folders" component={Folders} />
    <FoldersStack.Screen name="Movements" component={Movements} />
    <FoldersStack.Screen name="MovementDetail" component={MovementDetail} />
  </FoldersStack.Navigator>
);

const DeadlinesStack = createStackNavigator();
const DeadlinesScreens = () => (
  <DeadlinesStack.Navigator headerMode="none">
    <DeadlinesStack.Screen name="Deadlines" component={Deadlines} />
    <DeadlinesStack.Screen name="DeadlinesDetails" component={DeadlinesDetails} />
  </DeadlinesStack.Navigator>
);

const JurisprudenceStack = createStackNavigator();
const JurisprudenceScreens = () => (
  <JurisprudenceStack.Navigator headerMode="none">
    <JurisprudenceStack.Screen name="Jurisprudence" component={Jurisprudence} />
    <JurisprudenceStack.Screen name="JurisprudenceList" component={JurisprudenceList} />
    <JurisprudenceStack.Screen name="JurisprudenceDetail" component={JurisprudenceDetail} />
  </JurisprudenceStack.Navigator>
);

const AccountStack = createStackNavigator();
const AccountScreens = () => (
  <AccountStack.Navigator headerMode="none">
    <AccountStack.Screen name="Account" component={Account} />
    <AccountStack.Screen name="Notifications" component={Notifications} />
    <AccountStack.Screen name="Pushs" component={Pushs} />
    <AccountStack.Screen name="Emails" component={Emails} />
  </AccountStack.Navigator>
);

const AppScreens = () => (
  <TabsStack.Navigator
    initialRouteName="Folders"
    tabBarOptions={{
      showLabel: false,
      scrollEnabled: true,
      activeTintColor: colors.advise,
      inactiveTintColor: colors.grayLight,
      inactiveBackgroundColor: colors.white,
      activeBackgroundColor: colors.white,
      tabStyle: {
        width: 60
      },
      style: {
        backgroundColor: colors.white,
        height: Platform.OS == 'android' ? 64 : 80,
        paddingTop: Platform.OS == 'android' ? 0 : 8,
        marginBottom: -2,
      },
    }}
  >
    <TabsStack.Screen component={FoldersScreens} name="Folders" options={{
      tabBarIcon: ({ color }) => (
        <FontAwesome name="bolt" size={23} color={color} />
      ),
    }} />
    <TabsStack.Screen component={DeadlinesScreens} name="Deadlines" options={{
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="event" size={25} color={color} />
      ),
    }} />
    <TabsStack.Screen component={JurisprudenceScreens} name="Jurisprudence" options={{
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="gavel" size={25} color={color} />
      ),
    }} />
    <TabsStack.Screen component={AccountScreens} name="Account" options={{
      tabBarIcon: ({ color }) => (
        <UserIcon color={color} />
      ),
    }} />
  </TabsStack.Navigator>
);


const MainScreens = () => (
  <MainStack.Navigator headerMode="none" screenOptions={{
    gestureEnabled: false,
  }}>
    <MainStack.Screen name="Initial" component={Initial} />
    <MainStack.Screen name="Intro" component={Intro} />
    <MainStack.Screen name="Login" component={Login} />
    <MainStack.Screen name="Forgot" component={Forgot} />
    <MainStack.Screen name="App" component={AppScreens} />
    {/* <MainStack.Screen name="Account" component={Account} />
    <MainStack.Screen name="Notifications" component={Notifications} />
    <MainStack.Screen name="Pushs" component={Pushs} />
    <MainStack.Screen name="Emails" component={Emails} />
    <MainStack.Screen name="Folders" component={Folders} />
    <MainStack.Screen name="Movements" component={Movements} />
    <MainStack.Screen name="MovementDetail" component={MovementDetail} />
    <MainStack.Screen name="Jurisprudence" component={Jurisprudence} />
    <MainStack.Screen name="JurisprudenceList" component={JurisprudenceList} />
    <MainStack.Screen name="JurisprudenceDetail" component={JurisprudenceDetail} />
    <MainStack.Screen name="Deadlines" component={Deadlines} />
    <MainStack.Screen name="DeadlinesDetails" component={DeadlinesDetails} /> */}
  </MainStack.Navigator>
);

// const AuthStack = createStackNavigator(
//   {
//     Forgot,
//   },
//   {
//     header: null,
//     headerMode: 'none',
//   });

// const AppStack = createStackNavigator(
//   {
//     MenuMain,
//     Folders,
//     Movements,
//     MovementDetail,
//     Deadlines,
//     DeadlinesDetails,
//     Account,
//     Notifications,
//     Pushs,
//     Emails,
//     // AccountUser,
//     // AccountProfile,
//     // AccountOab,
//     // JurisFilterPage,
//     // AccountCompany,
//     // AccountPassword,
//     // ProcessList,
//     // Process,
//     // Add,
//     // Advogados,
//     // Partes,
//     // PublicationDetail,
//     // FilterSelect,
//     // Filters,
//     // FilterFonts,
//     // FilterKeywords,
//     // FilterJournal,
//     // FilterTribunal,
//     // FilterDateOfAvailability,
//     // SituationFilter,
//     Jurisprudence,
//     JurisprudenceList,
//     JurisprudenceDetail,
//   },
//   {
//     header: null,
//     headerMode: 'none',
//     false: false
//     // waitForRender: true,
//     // animationEnabled: true,
//     // defaultNavigationOptions: {
//     //   gestureEnabled: true,
//     //   cardOverlayEnabled: true,
//     // },
//   }
// );

// const Routes = createAppContainer(
//   // AppStack);
//   createSwitchNavigator(
//     {
//       Intro,
//       Login,
//       Auth: AuthStack,
//       App: AppStack,
//     },
//     {
//       initialRouteName: 'Intro',
//       waitForRender: true,

//       defaultNavigationOptions: {
//         gestureEnabled: true,
//         cardOverlayEnabled: true,
//         // ...TransitionPresets.ModalPresentationIOS,
//       },
//     }
//   )
// );

const Routes = () => (
  <NavigationContainer>
    <MainScreens />
  </NavigationContainer>
)

export default Routes;
