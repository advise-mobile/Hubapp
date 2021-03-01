import React, { useCallback } from 'react';
import { LogBox, Appearance, View, Text, Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';

import store from './store';
import { Provider } from 'react-redux';

import Routes from './navigation/Routes';
import { setTopLevelNavigator } from './navigation/NavigationService';

import StatusBar from './components/StatusBar';
import ToastNotify from './components/ToastNotify';

import { getLoggedUser } from 'helpers/Permissions';
import { registerNotification } from 'helpers/Pushs';

LogBox.ignoreLogs([
  "Can't perform a React state update on an unmounted component",
]);

LogBox.ignoreAllLogs(true);

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  // const onReceived = useCallback(notification => {
  //   console.log("Notification received: ", notification);
  // }, []);

  // const onOpened = useCallback(openResult => {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }, []);

  const onIds = useCallback(async device => {
    if (!device.userId) return false;

    const push = await registerNotification(device.userId);

    OneSignal.sendTags(push);

  }, []);

  const myiOSPromptCallback = () => {
    console.log('accepted');
  }

  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  OneSignal.inFocusDisplaying(0);
  // OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('ids', onIds);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? '#111111' : '#fff'}
        barStyle={barStyle}
      />
      <Routes ref={(navigatorRef) => setTopLevelNavigator(navigatorRef)} />
      <ToastNotify />
    </Provider>
  );
};

export default App;
