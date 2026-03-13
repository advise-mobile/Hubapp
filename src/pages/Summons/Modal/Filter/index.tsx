import React, { useState, useEffect, useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import 'moment/locale/pt-br';
import { BottomSheet } from '@components/BottomSheet';
import Datepicker from '@lcomponents/DatePicker';
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
  PickerTouch,
  PickerLabel,
} from './styles';

const SITUACAO_OPTIONS = [
  { value: 'all', label: 'Todas situações' },
  { value: 'read', label: 'Lidas' },
  { value: 'unread', label: 'Não lidas' },
] as const;

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
  const [localFilters, setLocalFilters] = useState<SummonsFilters>(initialFilters);
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

  useEffect(() => {
    if (visible) {
      setLocalFilters(initialFilters);
      setDataDe(
        typeof initialFilters.dataDe === 'string' ? initialFilters.dataDe : '',
      );
      setDataAte(
        typeof initialFilters.dataAte === 'string' ? initialFilters.dataAte : '',
      );
      setSituacao(
        typeof initialFilters.situacao === 'string'
          ? initialFilters.situacao
          : 'all',
      );
    }
  }, [visible, initialFilters]);

  const handleApply = () => {
    onApply({
      ...localFilters,
      dataDe,
      dataAte,
      situacao,
    });
    onClose();
  };

  const clearFiltersCount = [dataDe, dataAte, situacao !== 'all'].filter(
    Boolean,
  ).length;

  const handleClear = () => {
    setDataDe('');
    setDataAte('');
    setSituacao('all');
    setLocalFilters({});
  };

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
              maxDate={dataAte ? parseDateToPicker(dataAte) ?? undefined : undefined}
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
              minDate={dataDe ? parseDateToPicker(dataDe) ?? undefined : undefined}
              onDateChange={(date: Date) =>
                setDataAte(moment(date).format('DD/MM/YYYY'))
              }
            />
          </DateField>
        </DateRow>
      </Section>

      <Section>
        <SectionTitle>Situação</SectionTitle>
        {SITUACAO_OPTIONS.map((opt) => (
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
        <PickerTouch activeOpacity={0.7}>
          <PickerLabel>Selecione</PickerLabel>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#999" />
        </PickerTouch>
      </Section>

      <Section>
        <SectionTitle>Sistema</SectionTitle>
        <PickerTouch activeOpacity={0.7}>
          <PickerLabel>Selecione</PickerLabel>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#999" />
        </PickerTouch>
      </Section>
    </BottomSheet>
  );
}
