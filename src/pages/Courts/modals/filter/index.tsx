import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { useTheme } from 'styled-components';

import { BottomSheet } from '@components/BottomSheet';
import { Select } from '@components/Select';
import { fonts } from '@lassets/styles';
import type { CourtsFilterModalProps } from '@models/courts-components';
import {
	countActiveCourtRegistrationsFilters,
	DEFAULT_COURTS_REGISTRATIONS_FILTERS,
	type CourtsRegistrationsAccessFilter,
	type CourtsRegistrationsAppliedFilters,
	type CourtsRegistrationsSituationFilter,
} from '@models/court-registrations-filters';
import {
	getJudicialAgencyLabel,
	type JudicialAgencyOption,
} from '@models/filters-summons';
import { useCourts } from '@pages/Summons/hooks';

import {
	PickerField,
	PickerRow,
	RBRow,
	Section,
	SectionTitle,
} from './styles';

const ACCESS_OPTIONS: {
	value: CourtsRegistrationsAccessFilter;
	label: string;
}[] = [
	{ value: 'all', label: 'Todos' },
	{ value: 'active', label: 'Ativo' },
	{ value: 'inactive', label: 'Inativo' },
];

const SITUATION_OPTIONS: {
	value: CourtsRegistrationsSituationFilter;
	label: string;
}[] = [
	{ value: 'all', label: 'Todas' },
	{ value: 'success', label: 'Logado com sucesso' },
	{ value: 'failure', label: 'Falha ao acessar' },
	{ value: 'processing', label: 'Processando' },
];

function getTribunalFilterLabel(row: JudicialAgencyOption): string {
	const siglaOrgaoRaw = row.siglaOrgao;
	if (typeof siglaOrgaoRaw === 'string' && siglaOrgaoRaw.trim() !== '') {
		return siglaOrgaoRaw.trim();
	}
	return getJudicialAgencyLabel(row);
}

function parseIdOrgaoInitial(
	value: CourtsRegistrationsAppliedFilters['idOrgaoJudiciario'],
): number | null {
	if (value == null) return null;
	const parsedNumeric =
		typeof value === 'number' ? value : Number(value);
	return Number.isFinite(parsedNumeric) ? parsedNumeric : null;
}

export function CourtsFilterModal({
	visible,
	onClose,
	onApply,
	initialFilters = DEFAULT_COURTS_REGISTRATIONS_FILTERS,
}: CourtsFilterModalProps) {
	const { colors } = useTheme();
	const RBLabel = stylesRBLabel(colors);
	const { courts, isLoadingCourts, loadCourts } = useCourts();

	const [acesso, setAcesso] = useState<CourtsRegistrationsAccessFilter>(
		initialFilters.acesso,
	);
	const [idOrgaoJudiciario, setIdOrgaoJudiciario] = useState<number | null>(
		parseIdOrgaoInitial(initialFilters.idOrgaoJudiciario),
	);
	const [situacao, setSituacao] = useState<CourtsRegistrationsSituationFilter>(
		initialFilters.situacao,
	);

	useEffect(() => {
		if (!visible) return;
		setAcesso(initialFilters.acesso);
		setIdOrgaoJudiciario(parseIdOrgaoInitial(initialFilters.idOrgaoJudiciario));
		setSituacao(initialFilters.situacao);
	}, [visible, initialFilters]);

	useEffect(() => {
		if (visible) {
			loadCourts().catch(() => {});
		}
	}, [visible, loadCourts]);

	useEffect(() => {
		if (!visible || courts.length === 0) return;

		const org = parseIdOrgaoInitial(initialFilters.idOrgaoJudiciario);
		if (org != null) {
			setIdOrgaoJudiciario(
				courts.some(
					court => court.idOrgaoJudiciario === org,
				)
					? org
					: null,
			);
		}
	}, [visible, courts, initialFilters]);

	const localAsApplied = useMemo(
		(): CourtsRegistrationsAppliedFilters => ({
			acesso,
			idOrgaoJudiciario,
			situacao,
		}),
		[acesso, idOrgaoJudiciario, situacao],
	);

	const clearFiltersCount = countActiveCourtRegistrationsFilters(localAsApplied);

	const handleApply = useCallback(() => {
		onApply(localAsApplied);
		onClose();
	}, [localAsApplied, onApply, onClose]);

	const handleClear = useCallback(() => {
		setAcesso(DEFAULT_COURTS_REGISTRATIONS_FILTERS.acesso);
		setIdOrgaoJudiciario(DEFAULT_COURTS_REGISTRATIONS_FILTERS.idOrgaoJudiciario);
		setSituacao(DEFAULT_COURTS_REGISTRATIONS_FILTERS.situacao);
	}, []);

	const courtItems = useMemo(
		() =>
			courts.map((court: JudicialAgencyOption) => ({
				label: getTribunalFilterLabel(court),
				value: String(court.idOrgaoJudiciario),
			})),
		[courts],
	);

	return (
		<BottomSheet
			visible={visible}
			onClose={onClose}
			title="Filtros"
			primaryButtonText="Ver resultados"
			onPrimaryPress={handleApply}
			clearFiltersLabel={
				clearFiltersCount > 0 ? `Limpar (${clearFiltersCount})` : undefined
			}
			onClearFilters={clearFiltersCount > 0 ? handleClear : undefined}
			maxHeightRatio={0.72}
		>
			<Section>
				<SectionTitle>Acesso</SectionTitle>
				<RadioForm animation style={{ flex: 1 }}>
					{ACCESS_OPTIONS.map(obj => (
						<RBRow as={RadioButton} key={obj.value}>
							<RadioButtonInput
								obj={obj}
								isSelected={acesso === obj.value}
								onPress={value => setAcesso(value)}
								borderWidth={1}
								buttonInnerColor={colors.primary}
								buttonOuterColor={colors.primary}
								buttonSize={12}
								buttonOuterSize={18}
							/>
							<RadioButtonLabel
								obj={obj}
								labelStyle={RBLabel.label}
								onPress={value => setAcesso(value)}
							/>
						</RBRow>
					))}
				</RadioForm>
			</Section>

			<Section>
				<SectionTitle>Tribunal</SectionTitle>
				<PickerRow>
					<PickerField>
						<Select
							items={courtItems}
							value={
								idOrgaoJudiciario == null
									? null
									: String(idOrgaoJudiciario)
							}
							onChange={selectedValue => {
								if (selectedValue == null || selectedValue === '') {
									setIdOrgaoJudiciario(null);
									return;
								}
								const parsedJudicialOrganId = Number(selectedValue);
								setIdOrgaoJudiciario(
									Number.isFinite(parsedJudicialOrganId)
										? parsedJudicialOrganId
										: null,
								);
							}}
							loading={isLoadingCourts}
							placeholder="Todos"
							doneText="Selecionar"
						/>
					</PickerField>
				</PickerRow>
			</Section>

			<Section>
				<SectionTitle>Situação</SectionTitle>
				<RadioForm animation style={{ flex: 1 }}>
					{SITUATION_OPTIONS.map(obj => (
						<RBRow as={RadioButton} key={obj.value}>
							<RadioButtonInput
								obj={obj}
								isSelected={situacao === obj.value}
								onPress={value => setSituacao(value)}
								borderWidth={1}
								buttonInnerColor={colors.primary}
								buttonOuterColor={colors.primary}
								buttonSize={12}
								buttonOuterSize={18}
							/>
							<RadioButtonLabel
								obj={obj}
								labelStyle={RBLabel.label}
								onPress={value => setSituacao(value)}
							/>
						</RBRow>
					))}
				</RadioForm>
			</Section>
		</BottomSheet>
	);
}

const stylesRBLabel = (colors: { grayDarker: string }) =>
	StyleSheet.create({
		label: {
			color: colors.grayDarker,
			fontFamily: fonts.circularStdBook,
			fontSize: fonts.regular,
		},
	});
