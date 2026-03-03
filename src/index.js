import React, { useState, useEffect } from 'react';
import { Appearance, LogBox } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import store from '@lstore';
import { lightTheme, darkTheme } from '@theme';
import Routes from '@lnavigation/Routes';
import ToastNotify from '@lcomponents/ToastNotify';
import StatusBar from '@lcomponents/StatusBar';
import env from '@lservices/env';

LogBox.ignoreAllLogs(); // Ignore all log notifications

const App = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  useEffect(() => {
    // Inicializar OneSignal
    OneSignal.initialize(env.oneSignalId);

    // Configurar listeners básicos
    OneSignal.Notifications.addEventListener('click', event => {
      // Notificação clicada
    });

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
      // Exibir a notificação mesmo em foreground
      event.getNotification().display();
    });

    // Listener para quando o push subscription muda
    OneSignal.User.pushSubscription.addEventListener('change', event => {
      // Push subscription mudou
    });

    SplashScreen.hide();
  }, []);

  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme);
  });

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MenuProvider>
          <ThemeProvider theme={currentTheme}>
            <StatusBar
              backgroundColor={theme === 'dark' ? '#111111' : '#fff'}
              barStyle={barStyle}
            />
            <Routes />
            <ToastNotify />
          </ThemeProvider>
        </MenuProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
