import React, {useCallback, useEffect} from 'react';
import {LogBox, Appearance} from 'react-native';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

import store from './store';
import {Provider} from 'react-redux';

import Routes from './navigation/Routes';

import StatusBar from './components/StatusBar';
import ToastNotify from './components/ToastNotify';

import env from 'services/env';

import Smartlook from 'smartlook-react-native-wrapper';

LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component"]);

LogBox.ignoreAllLogs(true);

const App = () => {
	const colorScheme = Appearance.getColorScheme();
	const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

	useEffect(() => {
		OneSignal.setAppId(env.oneSignalId);
		SplashScreen.hide();

		Smartlook.setupAndStartRecording('446489ae4715d0f4b4a398f5abd7f2c2875723eb');
	}, []);

	return (
		<Provider store={store}>
			<StatusBar
				backgroundColor={colorScheme === 'dark' ? '#111111' : '#fff'}
				barStyle={barStyle}
			/>
			<Routes />
			<ToastNotify />
		</Provider>
	);
};

export default App;
