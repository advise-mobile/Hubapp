import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { useTheme } from 'styled-components';

import Datepicker from '@lcomponents/DatePicker';
import Spinner from '@lcomponents/Spinner';
import type {
	EventTypeItem,
	SummonsAddDeadlineFormValues,
} from '@models/summons-deadline';

import {
	AllDayBox,
	AllDayLabel,
	DateFieldWrap,
	FieldErrorText,
	FieldInput,
	FieldLabel,
	FieldRow,
	FormBlock,
	HourButton,
	HourText,
	ObservationsColumn,
	ObservationsInput,
	TypeBadge,
	TypeBadgeText,
	TypesBadges,
	TypesLoadingWrap,
} from './styles';

export interface SummonsAddDeadlineFormUIProps {
	control: Control<SummonsAddDeadlineFormValues>;
	errors: FieldErrors<SummonsAddDeadlineFormValues>;
	types: EventTypeItem[];
	isLoadingTypes: boolean;
	selectedTypeId: number | null;
	typesError: boolean;
	onSelectType: (typeId: number) => void;
	allDay: boolean;
	onAllDayChange: (value: boolean) => void;
}

export function SummonsAddDeadlineFormUI({
	control,
	errors,
	types,
	isLoadingTypes,
	selectedTypeId,
	typesError,
	onSelectType,
	allDay,
	onAllDayChange,
}: SummonsAddDeadlineFormUIProps) {
	const { colors } = useTheme();
	const [timePickerVisible, setTimePickerVisible] = useState(false);

	const hideTimePicker = useCallback(() => setTimePickerVisible(false), []);

	const toggleAllDay = useCallback(
		(
			current: boolean,
			onChange: (value: boolean) => void,
		) => {
			const next = !current;
			onChange(next);
			onAllDayChange(next);
		},
		[onAllDayChange],
	);

	return (
		<FormBlock>
			<FieldRow $error={Boolean(errors.titulo)}>
				<FieldLabel>Título</FieldLabel>
				<Controller
					control={control}
					name="titulo"
					rules={{
						validate: value =>
							String(value ?? '').trim().length >= 2 ||
							'Informe um título válido',
					}}
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<FieldInput
							ref={ref}
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							placeholder="Nome do prazo"
							placeholderTextColor={
								errors.titulo ? colors.red : colors.grayLight
							}
							$error={Boolean(errors.titulo)}
							returnKeyType="next"
						/>
					)}
				/>
			</FieldRow>
			{errors.titulo?.message ? (
				<FieldErrorText>{errors.titulo.message}</FieldErrorText>
			) : null}

			<FieldRow $error={typesError}>
				<FieldLabel>Tipo</FieldLabel>
				{isLoadingTypes ? (
					<TypesLoadingWrap>
						<Spinner height={22} />
					</TypesLoadingWrap>
				) : (
					<TypesBadges>
						{types.map(type => (
							<TypeBadge
								key={type.id}
								$active={selectedTypeId === type.id}
								$error={typesError}
								onPress={() => onSelectType(type.id)}
								activeOpacity={0.8}
							>
								<TypeBadgeText
									$active={selectedTypeId === type.id}
									$error={typesError}
								>
									{type.nome}
								</TypeBadgeText>
							</TypeBadge>
						))}
					</TypesBadges>
				)}
			</FieldRow>
			{typesError ? (
				<FieldErrorText>Selecione um tipo</FieldErrorText>
			) : null}

			<FieldRow>
				<Controller
					control={control}
					name="diaInteiro"
					render={({ field: { onChange, value } }) => (
						<AllDayBox>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => toggleAllDay(value, onChange)}
							>
								<AllDayLabel>Marcar como o dia todo</AllDayLabel>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => toggleAllDay(value, onChange)}
								hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
							>
								<CheckBox
									lineWidth={1.5}
									boxType="square"
									value={value}
									onValueChange={next => {
										onChange(next);
										onAllDayChange(next);
									}}
									animationDuration={0.2}
									tintColor={colors.primary}
									onCheckColor={colors.white}
									onFillColor={colors.primary}
									onTintColor={colors.primary}
									tintColors={{ true: colors.primary }}
									style={{ width: 18, height: 18, marginRight: 12 }}
								/>
							</TouchableOpacity>
						</AllDayBox>
					)}
				/>
			</FieldRow>

			<FieldRow $error={Boolean(errors.data)}>
				<FieldLabel>Data</FieldLabel>
				<DateFieldWrap>
					<Controller
						control={control}
						name="data"
						rules={{
							validate: value =>
								value != null || 'Selecione uma data',
						}}
						render={({ field: { onChange, value } }) => (
							<Datepicker
								date={value}
								enabled
								error={Boolean(errors.data)}
								title="Selecione uma data"
								style={{
									flexGrow: 1,
									maxWidth: 200,
									height: 22,
								}}
								onDateChange={onChange}
							/>
						)}
					/>
				</DateFieldWrap>
			</FieldRow>
			{errors.data?.message ? (
				<FieldErrorText>{errors.data.message}</FieldErrorText>
			) : null}

			{!allDay ? (
				<>
					<FieldRow $error={Boolean(errors.hora)}>
						<FieldLabel>Hora</FieldLabel>
						<Controller
							control={control}
							name="hora"
							rules={{
								validate: value =>
									(String(value ?? '').trim().length >= 5 &&
										/^\d{2}:\d{2}$/.test(String(value))) ||
									'Selecione um horário',
							}}
							render={({ field: { onChange, value } }) => (
								<HourButton
									onPress={() => setTimePickerVisible(true)}
									activeOpacity={0.7}
								>
									<HourText $error={Boolean(errors.hora)}>
										{value || 'Selecione um horário'}
									</HourText>
									<DateTimePickerModal
										mode="time"
										locale="en_GB"
										isVisible={timePickerVisible}
										onConfirm={date => {
											onChange(moment(date).format('HH:mm'));
											hideTimePicker();
										}}
										onCancel={hideTimePicker}
										headerTextIOS="Selecione um horário"
										cancelTextIOS="Cancelar"
										confirmTextIOS="Confirmar"
									/>
								</HourButton>
							)}
						/>
					</FieldRow>
					{errors.hora?.message ? (
						<FieldErrorText>{errors.hora.message}</FieldErrorText>
					) : null}
				</>
			) : null}

			<FieldRow>
				<FieldLabel>Localização</FieldLabel>
				<Controller
					control={control}
					name="localizacao"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<FieldInput
							ref={ref}
							value={value}
							onBlur={onBlur}
							onChangeText={onChange}
							placeholder="Digite uma localização"
							placeholderTextColor={colors.grayLight}
							returnKeyType="next"
						/>
					)}
				/>
			</FieldRow>

			<FieldRow $hideBorder>
				<ObservationsColumn>
					<FieldLabel>Observações</FieldLabel>
					<Controller
						control={control}
						name="observacao"
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<ObservationsInput
								ref={ref}
								multiline
								numberOfLines={5}
								value={value}
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder="Digite uma observação"
								placeholderTextColor={colors.grayLight}
							/>
						)}
					/>
				</ObservationsColumn>
			</FieldRow>
		</FormBlock>
	);
}
