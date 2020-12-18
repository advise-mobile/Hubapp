import './config/ReactotronConfig';

import React from 'react';
import { LogBox, Appearance, View, Text } from 'react-native';

import { Provider } from 'react-redux';

import store from './store';

import Routes from './navigation/Routes';
import { setTopLevelNavigator } from './navigation/NavigationService';

import StatusBar from './components/StatusBar';
import ToastNotify from './components/ToastNotify';

LogBox.ignoreLogs([
  "Can't perform a React state update on an unmounted component",
]);
// console.disableYellowBox = true;

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const barStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? '#111111' : '#fff'}
        barStyle={barStyle}
      />
      <Routes
        ref={(navigatorRef) => {
          setTopLevelNavigator(navigatorRef);
        }}
        />
      <ToastNotify />
    </Provider>
  );
};

export default App;
