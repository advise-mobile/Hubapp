import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios') {
  isIPhoneX = !((W_WIDTH !== X_WIDTH || W_HEIGHT !== X_HEIGHT) && !(W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT));
}

function getStatusBarHeight(skipAndroid = false) {
  if (Platform.OS === 'ios') {
    return isIPhoneX ? 44 : 20;
  }

  if (skipAndroid) {
    return 0;
  }

  return StatusBar.currentHeight;
}

const CustomAppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: getStatusBarHeight() }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

CustomAppStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default CustomAppStatusBar;
export const statusBarHeight = getStatusBarHeight();
