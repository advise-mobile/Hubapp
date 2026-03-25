import React, { useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { BottomSheet } from '@components/BottomSheet';
import { Select } from '@components/Select';
import Datepicker from '@lcomponents/DatePicker';
import {
	getJudicialAgencyLabel,
	type CourtOption,
	type JudicialAgencyOption,
} from '@models/filters-summons';
import { useCourts } from '@services/hooks/Summons/useCourts';
import type { SummonsFilters } from '../../hooks/useSummonsHeader';

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
	const n = typeof value === 'number' ? value : Number(value);
	return Number.isFinite(n) ? n : null;
}

function parseIdFonteInitial(value: unknown): number | null {
	if (value == null || value === '') return null;
	const n = typeof value === 'number' ? value : Number(value);
	return Number.isFinite(n) ? n : null;
}

export interface SummonsFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onApply: (filters: SummonsFilters) => void;
	initialFilters?: SummonsFilters;
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
		const m = moment(str, 'DD/MM/YYYY', true);
		return m.isValid() ? m.toDate() : null;
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
	/** Combo Sistema: `idFonteXTipoPesquisa` de `ConsultaFonteIntimacoes` (órgão escolhido). */
	const [idFonteXTipoPesquisaSistema, setIdFonteXTipoPesquisaSistema] =
		useState<number | null>(
			parseIdFonteInitial(initialFilters.idFonteXTipoPesquisaSistema),
		);

	const tribunalRow = useMemo((): JudicialAgencyOption | null => {
		if (idOrgaoJudiciario == null) return null;
		return (
			courts.find(c => c.idOrgaoJudiciario === idOrgaoJudiciario) ?? null
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
				courts.some(c => c.idOrgaoJudiciario === org) ? org : null,
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
			const m = moment(dataDe, 'DD/MM/YYYY', true);
			if (m.isValid()) {
				next.dataInicial = m.format('YYYY-MM-DD');
			}
		} else {
			delete next.dataInicial;
		}

		if (dataAte) {
			const m = moment(dataAte, 'DD/MM/YYYY', true);
			if (m.isValid()) {
				next.dataFinal = m.format('YYYY-MM-DD');
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

	const courtItems = courts.map((c: JudicialAgencyOption) => ({
		label: getJudicialAgencyLabel(c),
		value: String(c.idOrgaoJudiciario),
	}));

	const systemItems = systems.map((s: CourtOption) => ({
		label: s.nomeExibicao,
		value: String(s.idFonteXTipoPesquisa),
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
							onChange={v => {
								setIdFonteXTipoPesquisaSistema(null);
								if (v == null || v === '') {
									setIdOrgaoJudiciario(null);
									return;
								}
								const n = Number(v);
								setIdOrgaoJudiciario(Number.isFinite(n) ? n : null);
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
							onChange={v => {
								if (v == null || v === '') {
									setIdFonteXTipoPesquisaSistema(null);
									return;
								}
								const n = Number(v);
								setIdFonteXTipoPesquisaSistema(
									Number.isFinite(n) ? n : null,
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
