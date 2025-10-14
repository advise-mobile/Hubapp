import React, {useState, useEffect} from 'react';
import {LogBox, Appearance, Platform} from 'react-native';
import {OneSignal} from 'react-native-onesignal';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SplashScreen from 'react-native-splash-screen';

import {lightTheme, darkTheme} from './theme';
import {ThemeProvider} from 'styled-components';

import store from './store';
import {Provider} from 'react-redux';

import Routes from './navigation/Routes';

import StatusBar from './components/StatusBar';
import ToastNotify from './components/ToastNotify';

import env from 'services/env';

// Para ativar menus pop-up da lixeira e demais que vierem
import {MenuProvider} from 'react-native-popup-menu';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
	let colorScheme = Appearance.getColorScheme();

	const [theme, setTheme] = useState(colorScheme);

	function updateTheme() {
		colorScheme = Appearance.getColorScheme();
		setTheme(colorScheme);
	}

	let barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

	Appearance.addChangeListener(({colorScheme}) => {
		updateTheme();
	});

	useEffect(() => {
		OneSignal.initialize(env.oneSignalId);

		// Configurar listeners básicos
		OneSignal.Notifications.addEventListener('click', event => {
			// Handle notification click
		});

		OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
			// Exibir a notificação mesmo em foreground
			event.getNotification().display();
		});

		// Listener para quando o push subscription muda
		OneSignal.User.pushSubscription.addEventListener('change', event => {
			// Handle subscription changes
		});

		SplashScreen.hide();
	}, []);

	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<MenuProvider>
					<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
						<StatusBar
							backgroundColor={theme === 'dark' ? '#111111' : '#fff'}
							barStyle={barStyle}
						/>
						<Routes />
						<ToastNotify theme={theme === 'dark' ? darkTheme : lightTheme} />
					</ThemeProvider>
				</MenuProvider>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
