import React, {forwardRef, useState, useCallback, useEffect} from 'react';

import {StyleSheet, Dimensions} from 'react-native';

import {useForm, Controller, useWatch} from 'react-hook-form';

import Modal from '@components/Modal';
import Datepicker from '@components/DatePicker';

import {FormatDateEN} from '@helpers/DateFunctions';

import { GetMonthPeriod, GetToday, GetWeekPeriod, GetYearOnlyMonthsPeriod } from '@helpers/DateFunctions';

import {fonts} from 'assets/styles';

import {
	Title,
	Label,
	Row,
	Column,
	Footer,
	Cancel,
	CancelText,
	ToSave,
	ToSaveText,
	PeriodItemsContainer,
	PeriodItems,
	LabelPeriod,
	Container
} from './styles';

import {FilterProps, DataFilterProps} from './types';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

const periods = [
	{
		value:1,
		label:'Hoje'
	},
	{
		value:2,
		label:'Esta semana'
	},
	{
		value:3,
		label:'Este mês'
	},
	{
		value:4,
		label:'Este ano'
	}
];
const heightScreen = Dimensions.get('window').height;

const modalHeight = (heightScreen * 70) / 100;

export default CashFlowFilter = forwardRef(
	({handleSubmitFilters, handleClearFilters}: FilterProps, ref) => {

		const {
			control,
			handleSubmit,
			setError,
			setValue,
			getValues,
		} = useForm({
			shouldUnregister: false,
		});

		const changesForm = useWatch({
			control,
			name: ['period', 'dataSaldo','dataFim']
		  })

		// Variavel para usar o hook
		const colorUseTheme = useTheme();
		const {colors} = colorUseTheme;

		const onSubmit = (data: DataFilterProps) => {

			let filterPeriod:DataFilterProps = [];

			filterPeriod.dataSaldo = FormatDateEN(data.dataSaldo);
			filterPeriod.dataFim = FormatDateEN(data.dataFim);
			
			

			if(data.dataSaldo === null && data.dataFim === null ) {
				filterPeriod = getParametersPeriod(data.period!);
			}

			if(data.dataSaldo !== null && data.dataFim === null ) {
				filterPeriod = getParametersPeriod(data.period!);
				filterPeriod.dataSaldo = FormatDateEN(data.dataSaldo);
			}

			if(data.dataSaldo === null && data.dataFim !== null ) {
				filterPeriod = getParametersPeriod(data.period!);
				filterPeriod.dataFim = FormatDateEN(data.dataFim);
			}
			filterPeriod.period = data.period;
			handleSubmitFilters(filterPeriod);
		};

		const countFilters = useCallback(
			() => {
				let count = getValues();
				
				if(Object.keys(count).length === 0){
						setValue('period', 3);
						count.period = 3;
				}
				
				return checkNull([
					count.period,
					count.dataSaldo,
					count.dataFim
				])
			},
			[
				changesForm,
			],
		);

		const checkNull = useCallback(
			(states) => {
				 return states.filter(state => state != null && state != 0).length
				},
			[],
		);

		const clearFilters = useCallback(() => {
			
			setValue('period', 3);
			setValue('dataSaldo', null);
			setValue('dataFim', null);
			countFilters();
			handleClearFilters();
		}, []);

		const closeModal = useCallback(() => ref.current?.close(), []);

		const footer = () => (
			<Footer>
				<Cancel onPress={() => closeModal()}>
					<CancelText>Cancelar</CancelText>
				</Cancel>

				<ToSave onPress={handleSubmit(onSubmit)}>
					<ToSaveText>Ver resultados</ToSaveText>
				</ToSave>
			</Footer>
		);

		const getParametersPeriod = (id: number) => {
			let period = {
			  dataSaldo: null,
			  dataFim: null,
			};
		
			switch (id) {
				case 1:
		
				const { startDay, endOfDay } = GetToday(true);
				period = {
				  dataSaldo: startDay,
				  dataFim: endOfDay,
				};
				return period;
			  case 2:
				const { startOfWeek, endOfWeek } = GetWeekPeriod(true);
		
				period = {
				  dataSaldo: startOfWeek,
				  dataFim: endOfWeek,
				};
		
				return period;
			  case 3:
				const { startOfMonth, endOfMonth } = GetMonthPeriod(true);
		
				period = {
				  dataSaldo: startOfMonth,
				  dataFim: endOfMonth,
				};
				return period;

				case 4:
					const { startOfYear, endOfYear } = GetYearOnlyMonthsPeriod();

					period = {
						dataSaldo: startOfYear,
						dataFim: endOfYear,
					};

				return period;
			  default:
				return period;
			}
		  };

		return (
			<Modal
				maxHeight={modalHeight}
				ref={ref}
				footer={footer()}
				title="Filtros"
				filters={countFilters()}
				clear={clearFilters}>
				
				<Container>
					<Row>
						<Title>Período</Title>
					</Row>

					<Controller
						name="period"
						control={control}
						render={({onChange,value}) => (
							<PeriodItemsContainer>
								{periods.map((period) => (
									<PeriodItems
										value={value}
										key={period.value}
										onPress={() => {
											onChange(period.value);
										}}
										style={{
											backgroundColor: colors.gray,
										}}>
										<LabelPeriod style={{color: period.value === value ? colors.backgroundButton : colors.iconGray}}>
											{period.label}
										</LabelPeriod>
									</PeriodItems>
								))}
							</PeriodItemsContainer>

				)}
					/>

				</Container>

				<Container>

					<Row>
						<Column>
							<Label>De</Label>
							<Controller
								name="dataSaldo"
								control={control}
								defaultValue={null}
								render={({onChange,value}) => (
									<Datepicker
										date={value}
										enabled={true}
										title="dd/mm/aaaa"
										style={{maxWidth: 100}}	
										onDateChange={date => onChange(date)}
									/>
								)}/>
						</Column>
						<Column>
							<Label>Até</Label>
							<Controller
								name="dataFim"
								control={control}
								defaultValue={null}
								render={({onChange,value}) => (
									<Datepicker
										date={value}
										enabled={true}
										title="dd/mm/aaaa"
										style={{maxWidth: 100}}
										onDateChange={date => onChange(date)}
									/>
								)}/>
						</Column>
					</Row>
				</Container>
			</Modal>
		);
	},
);

const stylePickerSelectStyles = colors =>
	StyleSheet.create({
		inputIOS: {
			fontSize: 16,
			flex: 1,
			color: colors.fadedBlack,
			fontFamily: fonts.circularStdBook,
			borderBottomWidth: 1,
			borderBottomColor: colors.grayLighter,
		},
		inputAndroid: {
			height: 20,
			fontSize: 16,
			color: colors.fadedBlack,
			fontFamily: fonts.circularStdBook,
			flex: 1,
			borderBottomWidth: 1,
			borderBottomColor: colors.grayLighter,
		},
	});

const stylesRBLabel = colors =>
	StyleSheet.create({
		label: {
			color: colors.grayDarker,
			fontFamily: fonts.circularStdBook,
			fontSize: fonts.regular,
		},
	});
