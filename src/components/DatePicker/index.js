import React from 'react';

import DatePicker from 'react-native-datepicker';
import { StyleSheet } from 'react-native';

import { fonts } from 'assets/styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const Datepicker = ({ date, onDateChange, title, enabled, style, minDate, maxDate, customStyles,error = false }) =>{ 
   // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;  

  const styles = stylesDatePicker(colors);

  return(

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
        customStyles={customStyles || {
          btnTextConfirm: {
            color: colors.white
          },
          btnTextCancel: {
            color: colors.primary
          },
          btnConfirm:{
            backgroundColor: colors.primary,
            width:'49.5%',
          },
          btnCancel:{
            backgroundColor: colors.white,
            width:'49.5%',            
         },
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
            color: error ? colors.red : colors.grayLight,
            fontFamily: fonts.circularStdBook,
            fontSize: fonts.regular,
          },
          disabled: {
            backgroundColor: colors.white,
            fontFamily: fonts.circularStdBook,
            fontSize: fonts.regular,
          },
          dateText: {
            color: colors.grayLight,
            fontFamily: fonts.circularStdBook,
            fontSize: fonts.regular,
          },
          datePicker: {

            borderTopWidth: 0.2,
            borderTopColor: colors.primary,
            backgroundColor: colors.white,
            fontFamily: fonts.circularStdBook,
            fontSize: fonts.regular,
          },
        }}
      />
    )};

  const stylesDatePicker =  (colors) => StyleSheet.create({
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
    

export default Datepicker;
