import React, { useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { BottomSheet } from '@components/BottomSheet';
import { Select } from '@components/Select';
import Datepicker from '@lcomponents/DatePicker';
import type { SummonsFilterModalProps } from '@models/summons-components';
import type { SummonsFilters } from '@models/summons-hooks-types';
import {
	getJudicialAgencyLabel,
	type CourtOption,
	type JudicialAgencyOption,
} from '@models/filters-summons';
import { useCourts } from '@pages/Summons/hooks/useCourts';

import {
	Section,
	SectionTitle,
	DateRow,
	DateField,
	DateLabel,
	RadioOption,
	RadioCircle,
	RadioLabel,
	PickerRow,
	PickerField,
} from './styles';

const SITUACAO_OPTIONS = [
	{ value: 'all', label: 'Todas situações' },
	{ value: 'read', label: 'Lidas' },
	{ value: 'unread', label: 'Não lidas' },
] as const;

function parseIdOrgaoInitial(value: unknown): number | null {
	if (value == null || value === '') return null;
	const parsedNumeric =
		typeof value === 'number' ? value : Number(value);
	return Number.isFinite(parsedNumeric) ? parsedNumeric : null;
}

function parseIdFonteInitial(value: unknown): number | null {
	if (value == null || value === '') return null;
	const parsedNumeric =
		typeof value === 'number' ? value : Number(value);
	return Number.isFinite(parsedNumeric) ? parsedNumeric : null;
}

export function SummonsFilterModal({
	visible,
	onClose,
	onApply,
	initialFilters = {},
}: SummonsFilterModalProps) {
	const {
		courts,
		isLoadingCourts,
		loadCourts,
		systems,
		isLoadingSystems,
		loadSystems,
	} = useCourts();

	const [localFilters, setLocalFilters] =
		useState<SummonsFilters>(initialFilters);
	const parseDateToPicker = useCallback((str: string): Date | null => {
		if (!str || typeof str !== 'string') return null;
		const parsedDay = moment(str, 'DD/MM/YYYY', true);
		return parsedDay.isValid() ? parsedDay.toDate() : null;
	}, []);

	const [dataDe, setDataDe] = useState(
		typeof initialFilters.dataDe === 'string' ? initialFilters.dataDe : '',
	);
	const [dataAte, setDataAte] = useState(
		typeof initialFilters.dataAte === 'string' ? initialFilters.dataAte : '',
	);
	const [situacao, setSituacao] = useState<string>(
		(initialFilters.situacao as string) ?? 'all',
	);
	/** Combo Tribunal: `idOrgaoJudiciario` de `consulta-orgao-judiciario`. */
	const [idOrgaoJudiciario, setIdOrgaoJudiciario] = useState<number | null>(
		parseIdOrgaoInitial(initialFilters.idOrgaoJudiciario),
	);
	/** Combo Sistema: idFonteXTipoPesquisa from summons sources API (tribunal selecionado). */
	const [idFonteXTipoPesquisaSistema, setIdFonteXTipoPesquisaSistema] =
		useState<number | null>(
			parseIdFonteInitial(initialFilters.idFonteXTipoPesquisaSistema),
		);

	const tribunalRow = useMemo((): JudicialAgencyOption | null => {
		if (idOrgaoJudiciario == null) return null;
		return (
			courts.find(
				court => court.idOrgaoJudiciario === idOrgaoJudiciario,
			) ?? null
		);
	}, [courts, idOrgaoJudiciario]);

	useEffect(() => {
		if (visible) {
			setLocalFilters(initialFilters);
			setDataDe(
				typeof initialFilters.dataDe === 'string' ? initialFilters.dataDe : '',
			);
			setDataAte(
				typeof initialFilters.dataAte === 'string'
					? initialFilters.dataAte
					: '',
			);
			setSituacao(
				typeof initialFilters.situacao === 'string'
					? initialFilters.situacao
					: 'all',
			);
			setIdOrgaoJudiciario(
				parseIdOrgaoInitial(initialFilters.idOrgaoJudiciario),
			);
			setIdFonteXTipoPesquisaSistema(
				parseIdFonteInitial(initialFilters.idFonteXTipoPesquisaSistema),
			);
		}
	}, [visible, initialFilters]);

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

	useEffect(() => {
		if (!visible) return;
		const idOrg = tribunalRow?.idOrgaoJudiciario ?? null;
		if (idOrg != null) {
			loadSystems(idOrg).catch(() => {});
		} else {
			loadSystems(null);
		}
	}, [visible, tribunalRow?.idOrgaoJudiciario, loadSystems]);

	useEffect(() => {
		if (visible) {
			loadCourts().catch(() => {});
		}
	}, [visible, loadCourts]);

	const handleApply = () => {
		const next: SummonsFilters = {
			...localFilters,
			dataDe,
			dataAte,
			situacao,
		};

		if (dataDe) {
			const startDateMoment = moment(dataDe, 'DD/MM/YYYY', true);
			if (startDateMoment.isValid()) {
				next.dataInicial = startDateMoment.format('YYYY-MM-DD');
			}
		} else {
			delete next.dataInicial;
		}

		if (dataAte) {
			const endDateMoment = moment(dataAte, 'DD/MM/YYYY', true);
			if (endDateMoment.isValid()) {
				next.dataFinal = endDateMoment.format('YYYY-MM-DD');
			}
		} else {
			delete next.dataFinal;
		}

		if (situacao === 'read') {
			next.FlLido = true;
		} else if (situacao === 'unread') {
			next.FlLido = false;
		} else {
			delete next.FlLido;
		}

		if (idOrgaoJudiciario != null) {
			next.idOrgaoJudiciario = idOrgaoJudiciario;
			if (idFonteXTipoPesquisaSistema != null) {
				next.idFonteXTipoPesquisa = idFonteXTipoPesquisaSistema;
				next.idFonteXTipoPesquisaSistema = idFonteXTipoPesquisaSistema;
			} else {
				delete next.idFonteXTipoPesquisa;
				delete next.idFonteXTipoPesquisaSistema;
			}
		} else {
			delete next.idOrgaoJudiciario;
			delete next.idFonteXTipoPesquisa;
			delete next.idFonteXTipoPesquisaSistema;
		}

		onApply(next);
		onClose();
	};

	const clearFiltersCount = [
		dataDe,
		dataAte,
		situacao !== 'all',
		idOrgaoJudiciario != null,
		idFonteXTipoPesquisaSistema != null,
	].filter(Boolean).length;

	const handleClear = () => {
		setDataDe('');
		setDataAte('');
		setSituacao('all');
		setIdOrgaoJudiciario(null);
		setIdFonteXTipoPesquisaSistema(null);
		setLocalFilters({});
		loadSystems(null);
	};

	const courtItems = courts.map((court: JudicialAgencyOption) => ({
		label: getJudicialAgencyLabel(court),
		value: String(court.idOrgaoJudiciario),
	}));

	const systemItems = systems.map((systemRow: CourtOption) => ({
		label: systemRow.nomeExibicao,
		value: String(systemRow.idFonteXTipoPesquisa),
	}));

	const sistemaDisabled = tribunalRow == null;

	return (
		<BottomSheet
			visible={visible}
			onClose={onClose}
			title="Filtros"
			primaryButtonText="Ver Resultados"
			onPrimaryPress={handleApply}
			clearFiltersLabel={
				clearFiltersCount > 0 ? `Limpar (${clearFiltersCount})` : undefined
			}
			onClearFilters={clearFiltersCount > 0 ? handleClear : undefined}
			maxHeightRatio={0.7}
		>
			<Section>
				<SectionTitle>Período</SectionTitle>
				<DateRow>
					<DateField>
						<DateLabel>De</DateLabel>
						<Datepicker
							date={parseDateToPicker(dataDe) || null}
							enabled
							title="dd/mm/aaaa"
							maxDate={
								dataAte ? parseDateToPicker(dataAte) ?? undefined : undefined
							}
							onDateChange={(date: Date) =>
								setDataDe(moment(date).format('DD/MM/YYYY'))
							}
						/>
					</DateField>
					<DateField>
						<DateLabel>Até</DateLabel>
						<Datepicker
							date={parseDateToPicker(dataAte) || null}
							enabled
							title="dd/mm/aaaa"
							minDate={
								dataDe ? parseDateToPicker(dataDe) ?? undefined : undefined
							}
							onDateChange={(date: Date) =>
								setDataAte(moment(date).format('DD/MM/YYYY'))
							}
						/>
					</DateField>
				</DateRow>
			</Section>

			<Section>
				<SectionTitle>Situação</SectionTitle>
				{SITUACAO_OPTIONS.map(opt => (
					<RadioOption
						key={opt.value}
						onPress={() => setSituacao(opt.value)}
						activeOpacity={0.7}
					>
						<RadioCircle $selected={situacao === opt.value} />
						<RadioLabel>{opt.label}</RadioLabel>
					</RadioOption>
				))}
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
								setIdFonteXTipoPesquisaSistema(null);
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
							placeholder="Selecione"
							doneText="Selecionar"
						/>
					</PickerField>
				</PickerRow>
			</Section>

			<Section>
				<SectionTitle>Sistema</SectionTitle>
				<PickerRow>
					<PickerField>
						<Select
							items={systemItems}
							value={
								idFonteXTipoPesquisaSistema == null
									? null
									: String(idFonteXTipoPesquisaSistema)
							}
							onChange={selectedValue => {
								if (selectedValue == null || selectedValue === '') {
									setIdFonteXTipoPesquisaSistema(null);
									return;
								}
								const parsedSourceSearchId = Number(selectedValue);
								setIdFonteXTipoPesquisaSistema(
									Number.isFinite(parsedSourceSearchId)
										? parsedSourceSearchId
										: null,
								);
							}}
							loading={isLoadingSystems}
							disabled={sistemaDisabled}
							placeholder="Selecione"
							doneText="Selecionar"
						/>
					</PickerField>
				</PickerRow>
			</Section>
		</BottomSheet>
	);
}
