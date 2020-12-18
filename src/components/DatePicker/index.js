import React from 'react';

import DatePicker from 'react-native-datepicker';

import { colors, fonts } from 'assets/styles';
import styles from './styles';

const Datepicker = ({ date, onDateChange, title, enabled, style, minDate, maxDate }) => (
  <DatePicker
    style={{ ...styles.input, ...style }}
    date={date || null}
    mode="date"
    onDateChange={onDateChange}
    placeholder={title}
    format="DD/MM/YYYY"
    confirmBtnText="Confirmar"
    cancelBtnText="Cancelar"
    showIcon={false}
    disabled={!enabled}
    minDate={minDate}
    maxDate={maxDate}
    customStyles={{
      dateInput: {
        height: 20,
        marginBottom: -3,
        paddingBottom: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: enabled ? colors.grayLighter : colors.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontFamily: fonts.circularStdBook,
        fontSize: fonts.regular,
      },
      placeholderText: {
        color: colors.grayLight,
        fontFamily: fonts.circularStdBook,
        fontSize: fonts.regular,
      },
      disabled: {
        backgroundColor: colors.white,
        fontFamily: fonts.circularStdBook,
        fontSize: fonts.regular,
      },
      datePicker: {
        backgroundColor: colors.white,
        fontFamily: fonts.circularStdBook,
        fontSize: fonts.regular,
      },
    }}
  />
);

export default Datepicker;
