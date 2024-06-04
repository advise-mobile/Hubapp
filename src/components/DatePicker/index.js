import React, {useState, useEffect} from 'react';
import {View, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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

const stylesDatePicker = colors =>
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

export default Datepicker;
