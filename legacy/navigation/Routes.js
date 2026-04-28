// Imports antigos removidos - React Navigation v6
import React from 'react';

import { Platform, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { navigationRef } from '@lnavigation/NavigationService';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from '@lcomponents/UserIcon';
import CustomIcon from '@lcomponents/CustomIcon';

import Intro from '@lpages/Intro';
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
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';

const authSafeAreaStyles = StyleSheet.create({
	root: { flex: 1 },
});

/**
 * hoc para adicionar SafeAreaView ao componente
 */
function withAuthSafeArea(Component, edges = ['bottom']) {
	function Wrapped(props) {
		const { colors } = useTheme();
		return (
			<SafeAreaView
				style={[authSafeAreaStyles.root, { backgroundColor: colors.white }]}
				edges={edges}
			>
				<Component {...props} />
			</SafeAreaView>
		);
	}
	Wrapped.displayName = `WithAuthSafeArea(${
		Component.displayName || Component.name || 'Screen'
	})`;
	return Wrapped;
}

// Instâncias estáveis (nunca chamar withAuthSafeArea dentro do render do navigator).
const InitialWithSafeArea = withAuthSafeArea(Initial);
const TermsUseWithSafeArea = withAuthSafeArea(TermsUse);
const IntroWithSafeArea = withAuthSafeArea(Intro);
const LoginWithSafeArea = withAuthSafeArea(Login);
const ForgotWithSafeArea = withAuthSafeArea(Forgot);
const ClientWithSafeArea = withAuthSafeArea(Client);

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
	const colorUseTheme = useTheme();
	const insets = useSafeAreaInsets();

	// Altura fixa + inset inferior: evita sobreposição da barra de navegação do sistema
	// (comum em Android com gestos / 3 botões em POCO, Samsung, etc.)
	const androidTabBarHeight = 64 + insets.bottom;
	const androidTabPaddingBottom = 8 + insets.bottom;
	const iosTabBarHeight = 80 + insets.bottom;
	const iosTabPaddingBottom = 20 + insets.bottom;

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
					height:
						Platform.OS === 'android' ? androidTabBarHeight : iosTabBarHeight,
					paddingTop: Platform.OS === 'android' ? 8 : 16,
					paddingBottom:
						Platform.OS === 'android'
							? androidTabPaddingBottom
							: iosTabPaddingBottom,
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

const MainScreens = () => {
	const { colors } = useTheme();
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				cardStyle: { flex: 1, backgroundColor: colors.white },
			}}
		>
			<MainStack.Screen name="Initial" component={InitialWithSafeArea} />
			<MainStack.Screen name="TermsUse" component={TermsUseWithSafeArea} />
			<MainStack.Screen name="Intro" component={IntroWithSafeArea} />
			<MainStack.Screen name="Login" component={LoginWithSafeArea} />
			<MainStack.Screen name="Forgot" component={ForgotWithSafeArea} />
			<MainStack.Screen name="Client" component={ClientWithSafeArea} />
			<MainStack.Screen name="App" component={AppScreens} />
		</MainStack.Navigator>
	);
};

const Routes = () => (
	<NavigationContainer ref={navigationRef}>
		<MainScreens />
	</NavigationContainer>
);

export default Routes;
