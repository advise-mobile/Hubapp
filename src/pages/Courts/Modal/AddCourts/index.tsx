import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BottomSheet } from '@components/BottomSheet';
import { Button } from '@components/Button';
import { FormSheetRow } from '@components/FormSheetRow';
import { FormInputWithoutBorder } from '@components/FormInputWithoutBorder';
import { Select } from '@components/Select';
import { getLoggedUser } from '@lhelpers/Permissions';
import {
	getJudicialAgencyLabel,
	type CourtOption,
	type JudicialAgencyOption,
} from '@models/filters-summons';
import { isQrCodeCourtAccessType } from '@models/courts-credentials';
import { useCourts } from '@services/hooks/Summons/useCourts';
import { useTheme } from 'styled-components';

import { useRegisterCourtCredentialMutation } from '../../hooks/useRegisterCourtCredentialMutation';
import {
	FormBlock,
	ResponsibleRow,
	ResponsibleLabel,
	ResponsibleName,
	ButtonsFooter,
} from './styles';

const RESPONSIBLE_FALLBACK = '—';

const LOGIN_PASSWORD_MAX_LENGTH = 120;
const QR_DISPLAY_MAX_LENGTH = 39;

type FormValues = {
	idOrgaoJudiciario: string;
	idFonteXTipoPesquisaSistema: string;
	login: string;
	password: string;
	qrCode: string;
};

const defaultValues: FormValues = {
	idOrgaoJudiciario: '',
	idFonteXTipoPesquisaSistema: '',
	login: '',
	password: '',
	qrCode: '',
};

const requiredFieldMessage = 'Campo obrigatório';

const LABEL_MIN_WIDTH = 45;

function stripQrSpaces(value: string): string {
	return value.replace(/\s/g, '').toUpperCase();
}

function formatQrInGroups(rawAlnumUpper: string): string {
	const chunk = rawAlnumUpper.slice(0, 32);
	return chunk.replace(/(.{4})/g, '$1 ').trim();
}

export interface AddCourtsModalProps {
	visible: boolean;
	onClose: () => void;
}

export function AddCourtsModal({ visible, onClose }: AddCourtsModalProps) {
	const { colors } = useTheme();
	const registerCredential = useRegisterCourtCredentialMutation();
	const {
		courts,
		isLoadingCourts,
		loadCourts,
		systems,
		isLoadingSystems,
		loadSystems,
	} = useCourts();

	const [responsibleDisplay, setResponsibleDisplay] = useState(
		RESPONSIBLE_FALLBACK,
	);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({ defaultValues });

	const watchedJudicialOrganId = watch('idOrgaoJudiciario');
	const watchedSystemId = watch('idFonteXTipoPesquisaSistema');

	const systemSelectDisabled =
		watchedJudicialOrganId == null ||
		watchedJudicialOrganId === '' ||
		!Number.isFinite(Number(watchedJudicialOrganId));

	const credentialsFieldsDisabled =
		systemSelectDisabled ||
		watchedSystemId === '' ||
		!Number.isFinite(Number(watchedSystemId));

	const selectedCourtSystem = useMemo(() => {
		const systemId = Number(watchedSystemId);
		if (!Number.isFinite(systemId)) {
			return undefined;
		}
		return systems.find(
			(row: CourtOption) => row.idFonteXTipoPesquisa === systemId,
		);
	}, [systems, watchedSystemId]);

	const requiresQrCode = useMemo(
		() => isQrCodeCourtAccessType(selectedCourtSystem?.idTipoAcessoFontePesq),
		[selectedCourtSystem],
	);

	useEffect(() => {
		if (!requiresQrCode) {
			setValue('qrCode', '');
		}
	}, [requiresQrCode, setValue]);

	useEffect(() => {
		if (!visible) return;
		reset(defaultValues);
		loadCourts().catch(() => {});
		loadSystems(null);
		getLoggedUser()
			.then(user => {
				const nome = (user as { nome?: string }).nome;
				setResponsibleDisplay(
					typeof nome === 'string' && nome.trim() !== ''
						? nome.trim()
						: RESPONSIBLE_FALLBACK,
				);
			})
			.catch(() => setResponsibleDisplay(RESPONSIBLE_FALLBACK));
	}, [visible, reset, loadCourts, loadSystems]);

	const courtItems = useMemo(
		() =>
			courts.map((judicialAgency: JudicialAgencyOption) => ({
				label: getJudicialAgencyLabel(judicialAgency),
				value: String(judicialAgency.idOrgaoJudiciario),
			})),
		[courts],
	);

	const systemItems = useMemo(
		() =>
			systems.map((courtSystem: CourtOption) => ({
				label: courtSystem.nomeExibicao,
				value: String(courtSystem.idFonteXTipoPesquisa),
			})),
		[systems],
	);

	const onSubmit = async (values: FormValues) => {
		const judicialOrganId = Number(values.idOrgaoJudiciario);
		const courtSystemSourceId = Number(values.idFonteXTipoPesquisaSistema);
		const selectedRow = systems.find(
			(row: CourtOption) => row.idFonteXTipoPesquisa === courtSystemSourceId,
		);
		const needQr = isQrCodeCourtAccessType(selectedRow?.idTipoAcessoFontePesq);

		try {
			await registerCredential.mutateAsync({
				dadoAcesso: values.login.trim(),
				senha: values.password,
				idFonteXTipoPesquisa: courtSystemSourceId,
				idOrgaoJudiciario: judicialOrganId,
				...(needQr
					? { autenticacao: stripQrSpaces(values.qrCode) }
					: {}),
			});
			reset(defaultValues);
			onClose();
		} catch {
			/* toast no hook */
		}
	};

	return (
		<BottomSheet
			visible={visible}
			onClose={onClose}
			title="Nova captura de intimação"
			maxHeightRatio={0.72}
		>
			<FormBlock>
				<ResponsibleRow>
					<ResponsibleLabel>Responsável</ResponsibleLabel>
					<ResponsibleName>{responsibleDisplay}</ResponsibleName>
				</ResponsibleRow>

				<FormSheetRow
					label="Tribunal"
					error={errors.idOrgaoJudiciario?.message ?? null}
				>
					<Controller
						control={control}
						name="idOrgaoJudiciario"
						rules={{ required: requiredFieldMessage }}
						render={({ field: { onChange, value } }) => (
							<Select
								compact
								formRowAlign
								items={courtItems}
								value={value || null}
								onChange={selectedValue => {
									onChange(selectedValue ?? '');
									setValue('idFonteXTipoPesquisaSistema', '');
									setValue('login', '');
									setValue('password', '');
									setValue('qrCode', '');
									const courtIdNumber =
										selectedValue != null && selectedValue !== ''
											? Number(selectedValue)
											: null;
									loadSystems(
										courtIdNumber != null && Number.isFinite(courtIdNumber)
											? courtIdNumber
											: null,
									).catch(() => {});
								}}
								loading={isLoadingCourts}
								placeholder="Selecione"
								doneText="Selecionar"
							/>
						)}
					/>
				</FormSheetRow>

				<FormSheetRow
					label="Sistema do tribunal"
					longLabel
					error={errors.idFonteXTipoPesquisaSistema?.message ?? null}
				>
					<Controller
						control={control}
						name="idFonteXTipoPesquisaSistema"
						rules={{ required: requiredFieldMessage }}
						render={({ field: { onChange, value } }) => (
							<Select
								compact
								formRowAlign
								items={systemItems}
								value={value || null}
								onChange={selectedValue => {
									onChange(selectedValue ?? '');
									setValue('login', '');
									setValue('password', '');
									setValue('qrCode', '');
								}}
								loading={isLoadingSystems}
								disabled={systemSelectDisabled}
								placeholder="Selecione"
								doneText="Selecionar"
							/>
						)}
					/>
				</FormSheetRow>

				<FormSheetRow
					label="Login"
					labelMinWidth={LABEL_MIN_WIDTH}
					error={errors.login?.message ?? null}
				>
					<Controller
						control={control}
						name="login"
						rules={{
							validate: (fieldValue: string) => {
								if (credentialsFieldsDisabled) return true;
								return (
									String(fieldValue ?? '').trim() !== '' ||
									requiredFieldMessage
								);
							},
						}}
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<FormInputWithoutBorder
								ref={ref}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="Digite login"
								placeholderTextColor={colors.grayLight}
								autoCapitalize="none"
								autoCorrect={false}
								editable={!credentialsFieldsDisabled}
								maxLength={LOGIN_PASSWORD_MAX_LENGTH}
							/>
						)}
					/>
				</FormSheetRow>

				<FormSheetRow
					label="Senha"
					labelMinWidth={LABEL_MIN_WIDTH}
					error={errors.password?.message ?? null}
				>
					<Controller
						control={control}
						name="password"
						rules={{
							validate: (fieldValue: string) => {
								if (credentialsFieldsDisabled) return true;
								return (
									String(fieldValue ?? '').trim() !== '' ||
									requiredFieldMessage
								);
							},
						}}
						render={({ field: { onChange, onBlur, value, ref } }) => (
							<FormInputWithoutBorder
								ref={ref}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="Digite a senha"
								placeholderTextColor={colors.grayLight}
								secureTextEntry
								editable={!credentialsFieldsDisabled}
								maxLength={LOGIN_PASSWORD_MAX_LENGTH}
							/>
						)}
					/>
				</FormSheetRow>

				{requiresQrCode ? (
					<FormSheetRow
						label="QR Code"
						labelMinWidth={LABEL_MIN_WIDTH}
						error={errors.qrCode?.message ?? null}
					>
						<Controller
							control={control}
							name="qrCode"
							rules={{
								validate: (fieldValue: string) => {
									if (!requiresQrCode) return true;
									const raw = stripQrSpaces(fieldValue ?? '');
									return (
										raw.length === 32 ||
										'Informe o QR Code completo (32 caracteres)'
									);
								},
							}}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<FormInputWithoutBorder
									ref={ref}
									value={value}
									onChangeText={text => {
										const alnum = text
											.replace(/[^a-zA-Z0-9]/g, '')
											.toUpperCase()
											.slice(0, 32);
										onChange(formatQrInGroups(alnum));
									}}
									onBlur={onBlur}
									placeholder="XXXX XXXX …"
									placeholderTextColor={colors.grayLight}
									autoCapitalize="characters"
									autoCorrect={false}
									editable={!credentialsFieldsDisabled}
									maxLength={QR_DISPLAY_MAX_LENGTH}
								/>
							)}
						/>
					</FormSheetRow>
				) : null}
			</FormBlock>

			<ButtonsFooter>
				<Button fill variant="outlined" text="Cancelar" onPress={onClose} />
				<Button
					fill
					variant="filled"
					text="Cadastrar"
					onPress={handleSubmit(onSubmit)}
					disabled={registerCredential.isPending}
				/>
			</ButtonsFooter>
		</BottomSheet>
	);
}
