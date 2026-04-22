import React from 'react';
import { ActivityIndicator, Platform, Switch, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import type { CardRegisterDataProps } from '@models/courts-components';

import { getSituationMessageColor } from './situationColors';
import {
	ActionsInline,
	Card,
	ResponsibleTitle,
	ResponsibleTitleRow,
	ResponsibleValueLine,
	Section,
	SectionFirst,
	SituationValueLine,
	TitleLine,
	TrashButton,
	ValueLine,
} from './styles';

export function CardRegisterData({
	responsible,
	courtAbbreviation,
	system,
	accessLogin,
	situationMessage,
	situationTextColor,
	isActive,
	idPesqIntimacao,
	isInactivating = false,
	isActivating = false,
	isDeleting = false,
	onActiveChange,
	onDeletePress,
}: CardRegisterDataProps) {
	const { colors } = useTheme();
	const hasValidId =
		idPesqIntimacao != null && Number.isFinite(idPesqIntimacao);
	const isToggling = isInactivating || isActivating;
	const switchDisabled = onActiveChange == null || !hasValidId;
	const trashDisabled =
		onDeletePress == null || !hasValidId || isDeleting;

	const situationColor =
		situationTextColor ?? getSituationMessageColor(situationMessage);

	return (
		<Card>
			<SectionFirst>
				<ResponsibleTitleRow>
					<ResponsibleTitle>Responsável</ResponsibleTitle>
					<ActionsInline>
						<View
							style={{
								transform: [{ scale: 0.72 }],
								marginRight: -4,
							}}
						>
							{isToggling ? (
								<View
									style={{
										width: 51,
										height: 31,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<ActivityIndicator
										size="small"
										color={colors.primary}
									/>
								</View>
							) : (
								<Switch
									value={isActive}
									onValueChange={onActiveChange ?? (() => {})}
									disabled={switchDisabled}
									trackColor={{
										false: colors.gray ?? '#E0E0E0',
										true: colors.green200 ?? '#689F38',
									}}
									thumbColor={
										Platform.OS === 'android'
											? colors.realWhite ?? '#FFFFFF'
											: undefined
									}
								/>
							)}
						</View>
						<TrashButton
							activeOpacity={0.7}
							onPress={() => onDeletePress?.()}
							disabled={trashDisabled}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						>
							{isDeleting ? (
								<ActivityIndicator size="small" color={colors.primary} />
							) : (
								<MaterialIcons
									name="delete"
									size={20}
									color={trashDisabled ? '#BBBBBB' : '#666666'}
								/>
							)}
						</TrashButton>
					</ActionsInline>
				</ResponsibleTitleRow>
				<ResponsibleValueLine numberOfLines={3}>{responsible}</ResponsibleValueLine>
			</SectionFirst>

			<Section>
				<TitleLine>Tribunal</TitleLine>
				<ValueLine>{courtAbbreviation}</ValueLine>
			</Section>

			<Section>
				<TitleLine>Sistema</TitleLine>
				<ValueLine>{system}</ValueLine>
			</Section>

			<Section>
				<TitleLine>Login</TitleLine>
				<ValueLine>{accessLogin}</ValueLine>
			</Section>

			<Section>
				<TitleLine>Situação</TitleLine>
				<SituationValueLine style={{ color: situationColor }}>
					{situationMessage}
				</SituationValueLine>
			</Section>
		</Card>
	);
}
