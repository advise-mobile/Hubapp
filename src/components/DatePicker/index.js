import React, {useState, useEffect} from 'react';
import {View, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import DatePicker from 'react-native-datepicker';
import {fonts} from 'assets/styles';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

const Datepicker = ({
	date,
	onDateChange,
	title,
	enabled,
	style,
	minDate,
	maxDate,
	customStyles,
	error = false,
}) => {
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [selectedDate, setSelectedDate] = useState();

	const convertDate = date => {
		if (typeof date === 'string') {
			const [day, month, year] = date.split('/');
			return `${month}/${day}/${year}`;
		}
		return date;
	};

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const styles = stylesDatePicker(colors);

	useEffect(() => {
		if (date) {
			setSelectedDate(new Date(convertDate(date)));
		}
	}, [date]);

	const showMode = currentMode => {
		setShow(true);
		setMode(currentMode);
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setSelectedDate(currentDate);
		onDateChange(currentDate);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	return (
		<View>
			<View>
				<TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
					<Text style={styles.datePickerText}>
						{selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : title}
					</Text>
				</TouchableOpacity>
			</View>
			{enabled != false && show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={selectedDate || new Date()}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange}
					minimumDate={minDate}
					maximumDate={maxDate}
				/>
			)}
		</View>
	);
};

var stylesDatePicker = () => {};

if (Platform.OS === 'ios') {
	stylesDatePicker = colors =>
		StyleSheet.create({
			input: {
				// alignItems: 'flex-end',
				height: 16,
				justifyContent: 'center',
				width: '100%',
				fontSize: fonts.regular,
				color: colors.primary,
				fontFamily: fonts.circularStdBook,
			},
		});
} else {
	stylesDatePicker = colors =>
		StyleSheet.create({
			datePicker: {
				marginBottom: 1,
				borderColor: colors.grayLighter,
				borderBottomWidth: 1,
				maxWidth: 120,
			},
			datePickerText: {
				color: colors.primary,
			},
		});
}

const DatepickerIOS = ({
	date,
	onDateChange,
	title,
	enabled,
	style,
	minDate,
	maxDate,
	customStyles,
	error = false,
}) => {
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const styles = stylesDatePicker(colors);

	return (
		<DatePicker
			style={{...styles.input, ...style}}
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
			customStyles={
				customStyles || {
					btnTextConfirm: {
						color: colors.white,
					},
					btnTextCancel: {
						color: colors.primary,
					},
					btnConfirm: {
						backgroundColor: colors.primary,
						width: '49.5%',
					},
					btnCancel: {
						backgroundColor: colors.white,
						width: '49.5%',
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
				}
			}
		/>
	);
};

const DatepickerComponent = Platform.OS === 'ios' ? DatepickerIOS : Datepicker;

export default DatepickerComponent;
