import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  basePadding: 20,
  baseMargin: 10,
  baseRadius: 4,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
