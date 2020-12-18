import { Appearance } from 'react-native';

function colors() {
  const colorScheme = Appearance.getColorScheme();

  if (colorScheme === 'dark') {
    return {
      white: '#111111',
      realWhite: '#000',
      darkGray: '#666666',
      fadedWhite: 'rgba(0,0,0,0.69)',
      gray: '#050505',
      grayLight: 'rgba(255, 255, 255, .5)',
      grayDarker: 'rgba(255, 255, 255, .8)',
      textInactive: '#BBBBBB',
      red: '#D32F2F',
      advise: '#ff5800',
      hub: '#3f51e7',
      redLight: '#f6AB92',
      yellow: '#FFF59D',
      amber: '#FFE082',
      green: '#52dc8d',
      greenLight: '#C5E1A5',
      blueDark: '#1097B3',
      blueLighter: '#B7E0F1',
      iconGray: '#1b1b1b',
      backgroundButton: "#eee",
      pickerBloqued: '#ddd',

      niceBackground: '#2D2D2D',

      primary: '#eee',
      secondary: '#DDDDDD',
    };
  }

  return {
    white: '#fefefe',
    realWhite: '#FFFFFF',
    darkGray: '#666666',
    fadedWhite: 'rgba(255,255,255,0.69)',
    gray: '#EEEEEE',
    grayLight: 'rgba(0, 0, 0, .5)',
    grayDarker: 'rgba(0, 0, 0, .8)',
    textInactive: '#BBBBBB',
    red: '#D32F2F',
    advise: '#ff5800',
    hub: '#3f51e7',
    redLight: '#f6AB92',
    yellow: '#FFF59D',
    amber: '#FFE082',
    green: '#52dc8d',
    greenLight: '#C5E1A5',
    blueDark: '#1097B3',
    blueLighter: '#B7E0F1',
    iconGray: '#ababab',
    backgroundButton: "#111",
    niceBackground: '#FFF',
    pickerBloqued: '#ddd',

    primary: '#2D2D2D',
    secondary: '#2D2D2D',
  };
}

export default colors();
