// import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

import {Platform} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {navigationRef} from 'navigation/NavigationService';



import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'components/UserIcon';
import CustomIcon from 'components/CustomIcon';

import Intro from 'pages/Intro';
import Login from 'pages/Login';
import Forgot from 'pages/Forgot';
import Client from 'pages/Client';

import Account from '../pages/Account';
import Chat from '../pages/Account/Chat';
import Notifications from '../pages/Account/Notifications';
import Pushs from '../pages/Account/Notifications/Pushs';
import Emails from '../pages/Account/Notifications/Emails';
import PrivacyPolicy from '../pages/PrivacyPolicy';


import Folders from '../pages/Folders';
import Movements from '../pages/Movements';
import MovementDetail from '../pages/Movements/Details';
import MovementsTrash from '../pages/MovementsTrash';

import Finance from '../pages/Finance'


import Jurisprudence from '../pages/Jurisprudence';
import JurisprudenceList from '../pages/Jurisprudence/List';
import JurisprudenceDetail from '../pages/Jurisprudence/Details';

import Deadlines from '../pages/Deadlines';
import DeadlinesDetails from '../pages/Deadlines/Details';

import Initial from '../pages/Initial';
import TermsUse from '../pages/TermsUse';
import {colors} from 'assets/styles';

import {PermissionsGroups} from 'helpers/Permissions';

import { useTheme } from 'styled-components';

const MainStack = createStackNavigator();

const TabsStack = createBottomTabNavigator();

const FoldersStack = createStackNavigator();

const FoldersScreens = () => (
	<FoldersStack.Navigator headerMode="none">
		<FoldersStack.Screen name="Folders" component={Folders} />
		<FoldersStack.Screen name="Movements" component={Movements} />
		<FoldersStack.Screen name="MovementsTrash" component={MovementsTrash} />
		<FoldersStack.Screen name="MovementDetail" component={MovementDetail} />
	</FoldersStack.Navigator>
);

const FinanceScreens = () => (
	<FoldersStack.Navigator headerMode="none">
		<FoldersStack.Screen name="Finance" component={Finance} />
	</FoldersStack.Navigator>
);

const DeadlinesStack = createStackNavigator();
const DeadlinesScreens = () => (
	<DeadlinesStack.Navigator headerMode="none">
		<DeadlinesStack.Screen name="Deadlines" component={Deadlines} />
		<DeadlinesStack.Screen name="DeadlinesDetails" component={DeadlinesDetails} />
	</DeadlinesStack.Navigator>
);

/*const JurisprudenceStack = createStackNavigator();
const JurisprudenceScreens = () => (
	<JurisprudenceStack.Navigator headerMode="none">
		<JurisprudenceStack.Screen name="Jurisprudence" component={Jurisprudence} />
		<JurisprudenceStack.Screen name="JurisprudenceList" component={JurisprudenceList} />
		<JurisprudenceStack.Screen name="JurisprudenceDetail" component={JurisprudenceDetail} />
	</JurisprudenceStack.Navigator>
);*/

const AccountStack = createStackNavigator();
const AccountScreens = () => (
	<AccountStack.Navigator  headerMode="none">
		<AccountStack.Screen name="Account" component={Account} />
		<AccountStack.Screen name="Notifications" component={Notifications} />
		<AccountStack.Screen name="Pushs" component={Pushs} />
		<AccountStack.Screen name="Emails" component={Emails} />
		<AccountStack.Screen name="Chat" component={Chat} />
		<AccountStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
	</AccountStack.Navigator>
);

const AppScreens = () => (

	// Variavel para usar o hook
	colorUseTheme = useTheme(),

	<TabsStack.Navigator
		initialRouteName="Folders"
		tabBarOptions={{
			showLabel: false,
			scrollEnabled: true,
			activeTintColor:  colorUseTheme.colors.advise,
			inactiveTintColor:  colorUseTheme.colors.grayLight,
			inactiveBackgroundColor:  colorUseTheme.colors.white ,
			activeBackgroundColor:  colorUseTheme.colors.white ,
			tabStyle: {
				width: 60,
			},
			style: {
				backgroundColor:  colorUseTheme.colors.white,
				height: Platform.OS == 'android' ? 64 : 80,
				paddingTop: Platform.OS == 'android' ? 0 : 8,
				marginBottom: -2,
			},
		}}>
		{/* <TabsStack.Screen component={Blank} name="Blank" options={{
      tabBarIcon: ({ color }) => (
        <CustomIcon group={PermissionsGroups.MOVEMENTS}>
          <FontAwesome name="bolt" size={23} color={color} />
        </CustomIcon>
      ),
    }} /> */}
		<TabsStack.Screen
			component={FoldersScreens}
			name="Folders"
			options={{
				tabBarIcon: ({color}) => (
					<CustomIcon group={PermissionsGroups.MOVEMENTS}>
						<MaterialCommunityIcons name="lightning-bolt" size={25} color={color} />
					</CustomIcon>
				),
			}}
		/>
		<TabsStack.Screen
			component={DeadlinesScreens}
			name="Deadlines"
			options={{
				tabBarIcon: ({color}) => (
					<CustomIcon group={PermissionsGroups.SCHEDULE}>
						<MaterialIcons name="event" size={25} color={color} />
					</CustomIcon>
				),
			}}
		/>
		{/*<TabsStack.Screen
			component={JurisprudenceScreens}
			name="Jurisprudence"
			options={{
				tabBarIcon: ({color}) => (
					<CustomIcon group={PermissionsGroups.JURISPRUDENCE}>
						<MaterialIcons name="gavel" size={25} color={color} />
					</CustomIcon>
				),
			}}
		/>*/}

			<TabsStack.Screen
			component={FinanceScreens}
			name="Finance"
			options={{
				tabBarIcon: ({color}) => (
					<CustomIcon group={PermissionsGroups.SCHEDULE}>
						<MaterialIcons name="attach-money" size={25} color={color} />
					</CustomIcon>
				),
			}}
		/>


		<TabsStack.Screen
			component={AccountScreens}
			name="Account"
			options={{
				tabBarIcon: ({color}) => <UserIcon color={color} />,
			}}
		/>

	</TabsStack.Navigator>
);


const MainScreens = () => (
		<MainStack.Navigator headerMode="none" screenOptions={{gestureEnabled: false}}>
			<MainStack.Screen name="Finance" component={Finance} />
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
