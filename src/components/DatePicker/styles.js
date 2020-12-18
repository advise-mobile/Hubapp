import { StyleSheet } from 'react-native';

import { colors, fonts } from 'assets/styles';

const styles = StyleSheet.create({
  input: {
    // alignItems: 'flex-end',
    height: 16,
    justifyContent: 'center',
    width: '100%',
    fontSize: fonts.regular,
    color: colors.primary,
    fontFamily: fonts.circularStdBook
  }
});

export default styles;
