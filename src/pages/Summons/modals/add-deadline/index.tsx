import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { BottomSheet } from '@components/BottomSheet';
import { Button } from '@components/Button';
import type { SummonsAddDeadlineModalProps } from '@models/summons-components';
import type { SummonsAddDeadlineFormValues } from '@models/summons-deadline';
import {
	useCreateSummonsDeadlineMutation,
	useEventTypesQuery,
	useUserAgendaQuery,
} from '@pages/Summons/hooks';

import { ButtonsFooter } from './styles';
import { SummonsAddDeadlineFormUI } from './ui';

const DEFAULT_VALUES: SummonsAddDeadlineFormValues = {
	titulo: '',
	diaInteiro: false,
	data: null,
	hora: '',
	localizacao: '',
	observacao: '',
};

export function SummonsAddDeadlineModal({
	visible,
	onClose,
	idMovProcessoCliente,
}: SummonsAddDeadlineModalProps) {
	const createDeadline = useCreateSummonsDeadlineMutation();
	const { data: eventTypes = [], isLoading: isLoadingTypes } =
		useEventTypesQuery(visible);
	const { data: idAgenda = 0 } = useUserAgendaQuery(visible);

	const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
	const [typesError, setTypesError] = useState(false);
	const [allDay, setAllDay] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<SummonsAddDeadlineFormValues>({
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		if (!visible) {
			return;
		}

		reset(DEFAULT_VALUES);
		setSelectedTypeId(null);
		setTypesError(false);
		setAllDay(false);
	}, [visible, reset]);

	const handleAllDayChange = useCallback(
		(value: boolean) => {
			setAllDay(value);
			if (value) {
				setValue('hora', '');
			}
		},
		[setValue],
	);

	const handleSelectType = useCallback((typeId: number) => {
		setSelectedTypeId(typeId);
		setTypesError(false);
	}, []);

	const onSubmit = useCallback(
		async (values: SummonsAddDeadlineFormValues) => {
			if (selectedTypeId == null) {
				setTypesError(true);
				return;
			}

			try {
				await createDeadline.mutateAsync({
					titulo: values.titulo.trim(),
					idAgenda,
					idTipoEventoAgenda: selectedTypeId,
					idMovProcessoCliente,
					diaInteiro: values.diaInteiro,
					date: values.data,
					hour: values.diaInteiro ? null : values.hora,
					localizacao: values.localizacao.trim(),
					observacao: values.observacao.trim(),
				});
				onClose();
			} catch {
				/* toast no hook */
			}
		},
		[createDeadline, idAgenda, idMovProcessoCliente, onClose, selectedTypeId],
	);

	return (
		<BottomSheet
			visible={visible}
			onClose={onClose}
			title="Cadastrar prazo"
			maxHeightRatio={0.78}
			footer={
				<ButtonsFooter>
					<Button
						fill
						variant="outlined"
						text="Cancelar"
						onPress={onClose}
						disabled={createDeadline.isPending}
					/>
					<Button
						fill
						variant="filled"
						text="Salvar"
						onPress={handleSubmit(onSubmit)}
						loading={createDeadline.isPending}
					/>
				</ButtonsFooter>
			}
		>
			<SummonsAddDeadlineFormUI
				control={control}
				errors={errors}
				types={eventTypes}
				isLoadingTypes={isLoadingTypes}
				selectedTypeId={selectedTypeId}
				typesError={typesError}
				onSelectType={handleSelectType}
				allDay={allDay}
				onAllDayChange={handleAllDayChange}
			/>
		</BottomSheet>
	);
}
