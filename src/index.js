import React, {useState, useEffect} from 'react';
import {LogBox, Appearance} from 'react-native';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

import  { lightTheme, darkTheme }  from './theme';
import { ThemeProvider } from 'styled-components';

import store from './store';
import {Provider} from 'react-redux';

import Routes from './navigation/Routes';

import StatusBar from './components/StatusBar';
import ToastNotify from './components/ToastNotify';

import env from 'services/env';

import Smartlook from 'smartlook-react-native-wrapper';

// Para ativar menus pop-up da lixeira e demais que vierem
import { MenuProvider } from 'react-native-popup-menu';


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
		OneSignal.setAppId(env.oneSignalId);
		SplashScreen.hide();

		Smartlook.setupAndStartRecording('446489ae4715d0f4b4a398f5abd7f2c2875723eb');
		
	}, []);


	return (
		<Provider store={store}>
			<MenuProvider>
				<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
					
					<StatusBar
						backgroundColor={theme === 'dark' ? '#111111' : '#fff'}
						barStyle={barStyle}
					/>
					<Routes />
					<ToastNotify />
				</ThemeProvider>
			</MenuProvider>
		</Provider>
	);
};

export default App;
