import React, { useMemo, useRef } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';

import {
	LoadingWrap,
	SelectTouchOverlay,
	SelectWrap,
	useRNPickerSelectStyles,
} from './styles';

export interface SelectItem {
	label: string;
	value: string;
}

export interface SelectProps {
	items: SelectItem[];
	value: string | null;
	onChange: (value: string | null) => void;
	placeholder?: string;
	doneText?: string;
	loading?: boolean;
	disabled?: boolean;
}

function SelectDropdownIcon() {
	const { colors } = useTheme();
	return (
		<MaterialIcons name="arrow-drop-down" size={18} color={colors.iconGray} />
	);
}

export function Select({
	items,
	value,
	onChange,
	placeholder = 'Selecione',
	doneText = 'Selecionar',
	loading = false,
	disabled = false,
}: SelectProps) {
	const { colors } = useTheme();
	const pickerRef = useRef<InstanceType<typeof RNPickerSelect> | null>(null);

	const selectedLabel = useMemo(() => {
		if (value == null || value === '') return null;
		return items.find(i => i.value === value)?.label ?? null;
	}, [items, value]);

	const pickerStyles = useRNPickerSelectStyles();

	if (loading) {
		return (
			<LoadingWrap>
				<ActivityIndicator size="small" color={colors.primary} />
			</LoadingWrap>
		);
	}

	const pickerValue = value == null || value === '' ? undefined : value;

	const openPicker = () => {
		if (disabled) return;
		pickerRef.current?.togglePicker?.(true);
	};

	return (
		<SelectWrap>
			<RNPickerSelect
				ref={pickerRef}
				items={items}
				value={pickerValue}
				onValueChange={v => {
					if (v == null || v === '') {
						onChange(null);
						return;
					}
					onChange(String(v));
				}}
				placeholder={{ label: placeholder, value: null }}
				disabled={disabled}
				doneText={doneText}
				useNativeAndroidPickerStyle={
					Platform.OS === 'android' ? false : undefined
				}
				fixAndroidTouchableBug={Platform.OS === 'android'}
				textInputProps={{
					pointerEvents: 'none',
				}}
				pickerProps={
					Platform.OS === 'android'
						? { style: { zIndex: 2, elevation: 2 } }
						: undefined
				}
				touchableWrapperProps={
					Platform.OS === 'android'
						? {
								activeOpacity: 0.7,
								hitSlop: { top: 30, bottom: 30, left: 30, right: 30 },
							}
						: { activeOpacity: 1 }
				}
				Icon={SelectDropdownIcon}
				style={pickerStyles}
			/>
			{Platform.OS === 'ios' && !disabled ? (
				<SelectTouchOverlay
					onPress={openPicker}
					accessibilityRole="button"
					accessibilityLabel={selectedLabel ?? placeholder}
				/>
			) : null}
		</SelectWrap>
	);
}
