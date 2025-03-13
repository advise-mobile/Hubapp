import React, {useState, useEffect} from 'react';
import {View, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/pt-br';
import {useTheme} from 'styled-components';

const Datepicker = ({date, onDateChange, title, enabled, minDate, maxDate}) => {
	const [isDatePickerVisible, setDatePickerVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState();

	const convertDate = date => {
		if (typeof date === 'string') {
			const [day, month, year] = date.split('/');
			return `${month}/${day}/${year}`;
		}
		return date;
	};

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;
	const styles = stylesDatePicker(colors);

	useEffect(() => {
		moment.locale('pt-br');
		if (date) {
			setSelectedDate(new Date(convertDate(date)));
		}
	}, [date]);

	const showDatePicker = () => {
		setDatePickerVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisible(false);
	};

	const handleConfirm = date => {
		hideDatePicker();
		setSelectedDate(date);
		onDateChange(date);
	};

	return (
		<View>
			<TouchableOpacity onPress={showDatePicker} disabled={!enabled} style={styles.datePicker}>
				<Text style={styles.datePickerText}>
					{selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : title}
				</Text>
			</TouchableOpacity>

			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				date={selectedDate || new Date()}
				minimumDate={minDate}
				maximumDate={maxDate}
				locale="pt-BR"
				confirmTextIOS="Confirmar"
				cancelTextIOS="Cancelar"
				headerTextIOS="Selecione uma data"
			/>
		</View>
	);
};

var stylesDatePicker = () => {};

if (Platform.OS === 'ios') {
	stylesDatePicker = colors =>
		StyleSheet.create({
			datePicker: {
				marginBottom: 1,
				borderColor: colors.grayLighter,
				maxWidth: 150,
			},
			datePickerText: {
				color: colors.primary,
			},
		});
} else {
	stylesDatePicker = colors =>
		StyleSheet.create({
			datePicker: {
				marginBottom: 1,
				borderColor: colors.grayLighter,
				maxWidth: 150,
			},
			datePickerText: {
				color: colors.primary,
			},
		});
}

export default Datepicker;
