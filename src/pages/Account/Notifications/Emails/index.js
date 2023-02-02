import React, {useState, useEffect, useCallback, useRef} from 'react';
import {RefreshControl, Animated, Switch, Platform, StyleSheet, TouchableOpacity, Text, Image, View, Pressable, Appearance} from 'react-native';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import Api from 'services/Api';
import {getLoggedUser, PermissionsGroups, checkPermission} from 'helpers/Permissions';

import useDebouncedEffect from 'use-debounced-effect';
// import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {fonts, colors} from 'assets/styles';
import {Container, Warp} from 'assets/styles/general';
import {
	List,
	ListItem,
	ListContent,
	ListText,
	Title,
	TitleContainer,
	Options,
	Option,
	EmailsList,
	EmailContent,
	ActionButton,
	ButtonInfo
} from './styles';

import Add from './Modals/Add';
import Confirmation from './Modals/Confirmation';
import { useResponsiveQuery } from 'react-native-responsive-query';

export default Emails = props => {
	const addRef = useRef(null);
	const confirmationRef = useRef(null);
	const colorScheme = Appearance.getColorScheme();

	const [userData, setUserData] = useState({});

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const [data, setData] = useState([]);
	const [emails, setEmails] = useState([]);
	const [movementsAlert, setMovementsAlert] = useState(false);
	const [noNewMovementsAlert, setNoNewMovementsAlert] = useState(false);

	const [processesAlert, setProcessesAlert] = useState(false);
	const [currentEmail, setCurrentEmail] = useState(null);
	const [permissionPublications, setPermissionPublications] = useState(false);
	const [permissionProcesses, setPermissionProcesses] = useState(false);

	const activeOptionsMovements = useRef(new Animated.Value(1)).current;
	const activeOptionsNoNewMovements = useRef(new Animated.Value(1)).current;
	const activeOptionsProcesses = useRef(new Animated.Value(1)).current;
	const [showTooltip, setShowTooltip] = useState(false)

	
	
	useEffect(() => {
		getLoggedUser().then(user => setUserData(user));
		setLoading(true);

		getActionEvents();

		getEmailsUser();

		checkPermission(PermissionsGroups.PROCESSES).then(hasPermission =>
			setPermissionProcesses(hasPermission),
		);
		checkPermission(PermissionsGroups.PUBLICATIONS).then(hasPermission =>
			setPermissionPublications(hasPermission),
		);
	}, []);

	const onPressShowTooltip = () => {
		setShowTooltip(!showTooltip)
	}

	useDebouncedEffect(
		() => {
			if (loading) return;

			const items = checkDiff().map(rule => {
				const {ativo, idRegraAcaoEvento, idUsuarioCliente} = rule;

				return {
					ativo,
					idRegraAcaoEvento,
					idUsuarioCliente: idUsuarioCliente.toString(),
					idCliente: userData.idCliente,
				};
			});

			if (items.length < 1) return;

			Api.put(`core/v1/acao-evento-usuario-cliente`, {itens: items});
		},
		1000,
		[data],
	);

	const getEmailsUser = useCallback(() => {
		setRefreshing(true);

		Api.get(`/core/v1/emails-usuario-cliente?campos=*&flAtivo=true`).then(({data}) => {
			const {itens} = data;

			setEmails(itens);
		});
	}, []);

	const getActionEvents = useCallback(() => {
		setRefreshing(true);

		Api.get(
			`/core/v1/acoes-eventos-usuarios?campos=ativo,id,idUsuarioCliente,idRegraAcaoEvento,idProdutoAdviseXAcaoEvento,descricaoRegraAcaoEvento,nomeProdutoAdviseXAcaoEvento`,
		)
			.then(response => {
				const itens = response.data.itens[0];

				itens.map(item => (item.update = false));

				setData(itens.filter(item => item.nomeProdutoAdviseXAcaoEvento == 'HUB'));

				const ids = itens.length
					? itens.filter(item => item.ativo).map(item => item.idRegraAcaoEvento)
					: null;

				if (ids && (ids.includes(-24) || ids.includes(-25))) {
					setNoNewMovementsAlert(true);
				} else {
					setNoNewMovementsAlert(false);

					Animated.timing(activeOptionsNoNewMovements, {
						toValue: 0,
						duration: 300,
						useNativeDriver: false,
					}).start();
				}

				if (ids && (ids.includes(-1) || ids.includes(-23))) {
					setMovementsAlert(true);
				} else {
					setMovementsAlert(false);

					Animated.timing(activeOptionsMovements, {
						toValue: 0,
						duration: 300,
						useNativeDriver: false,
					}).start();
				}

				if (ids && (ids.includes(-3) || ids.includes(-31))) {
					setProcessesAlert(true);
				} else {
					setProcessesAlert(false);

					Animated.timing(activeOptionsProcesses, {
						toValue: 0,
						duration: 300,
						useNativeDriver: false,
					}).start();
				}
			})
			.finally(() => {
				setLoading(false);
				setRefreshing(false);
			});
	}, []);

	const getActionValue = useCallback(
		id => {
			const rule = data.find(action => action.idRegraAcaoEvento == id);

			return rule?.ativo || false;
		},
		[data],
	);

	const toggleCheck = useCallback(
		id => {
			let newValues = data.map(action => {
				if (action.idRegraAcaoEvento != id) return action;

				action.update = true;
				action.ativo = !action.ativo;

				return action;
			});

			setData(newValues);
		},
		[data],
	);

	const checkDiff = useCallback(() => data.filter(rule => rule.update), [data]);

	const handleNoNewPublications = () => {
		const active = !noNewMovementsAlert;

		setNoNewMovementsAlert(!noNewMovementsAlert);

		const value = activeOptionsNoNewMovements.__getValue() == 0 ? 1 : 0;

		Animated.timing(activeOptionsNoNewMovements, {
			toValue: value,
			duration: 300,
			useNativeDriver: false,
		}).start();

		let newValues = [];

		if (!active) {
			newValues = data.map(action => {
				if (action.idRegraAcaoEvento == -24 || action.idRegraAcaoEvento == -25) {
					action.update = true;
					action.ativo = false;
				}

				return action;
			});
		} else {
			newValues = data.map(action => {
				if (action.idRegraAcaoEvento == -24) {
					action.update = true;
					action.ativo = true;
				}

				return action;
			});
		}

		setData(newValues);
	};

	const handleNewPublications = () => {
		const active = !movementsAlert;

		setMovementsAlert(!movementsAlert);

		const value = activeOptionsMovements.__getValue() == 0 ? 1 : 0;

		Animated.timing(activeOptionsMovements, {
			toValue: value,
			duration: 300,
			useNativeDriver: false,
		}).start();

		let newValues = [];

		if (!active) {
			newValues = data.map(action => {
				if (action.idRegraAcaoEvento == -1 || action.idRegraAcaoEvento == -23) {
					action.update = true;
					action.ativo = false;
				}

				return action;
			});
		} else {
			newValues = data.map(action => {
				if (action.idRegraAcaoEvento == -1) {
					action.update = true;
					action.ativo = true;
				}

				return action;
			});
		}

		setData(newValues);
	};

	const handleNewMovements = () => {
		const active = !processesAlert;

		setProcessesAlert(!processesAlert);

		const value = activeOptionsProcesses.__getValue() == 0 ? 1 : 0;

		Animated.timing(activeOptionsProcesses, {
			toValue: value,
			duration: 300,
			useNativeDriver: false,
		}).start();

		let newValues = [];

		if (!active) {
			newValues = data.map(action => {
				if (action.idRegraAcaoEvento == -3 || action.idRegraAcaoEvento == -31) {
					action.update = true;
					action.ativo = false;
				}

				return action;
			});
		} else {
			newValues = data.map(action => {
				if (action.idRegraAcaoEvento == -3) {
					action.update = true;
					action.ativo = true;
				}

				return action;
			});
		}

		setData(newValues);
	};

	const handleNotificationMovements = useCallback(
		(key, value) => {
			const newValues = data.map(action => {
				if (key === -1 || key === -23) {
					if (action.idRegraAcaoEvento == -1 || action.idRegraAcaoEvento == -23) {
						action.update = true;
						action.ativo = !action.ativo;
					}
				} else if (key === -3 || key === -31) {
					if (action.idRegraAcaoEvento == -3 || action.idRegraAcaoEvento == -31) {
						action.update = true;
						action.ativo = !action.ativo;
					}
				} else {
					if (action.idRegraAcaoEvento == -24 || action.idRegraAcaoEvento == -25) {
						action.update = true;
						action.ativo = !action.ativo;
					}
				}

				return action;
			});
			setData(newValues);
		},
		[data],
	);

	const handleConfirmation = useCallback(email => {
		setCurrentEmail(email);

		confirmationRef.current?.open();
	});

	const renderConfirmation = useCallback(
		() => (
			<Confirmation
				ref={confirmationRef}
				onRemoveEmail={id => onRemoveEmail(id)}
				email={currentEmail}
			/>
		),
		[currentEmail],
	);

	const onRecordEmail = useCallback(email => setEmails([email, ...emails]), [emails]);

	const onRemoveEmail = useCallback(
		id => {
			const newEmails = emails.filter(email => email.id !== id);

			setEmails(newEmails);
		},
		[emails],
	);

	return (
		<Container>
			{showTooltip && (
				<View style={styles.viewOverlayElement}>
					<View style={styles.viewInfo}>
						<View>
								<Text style={{
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 20,
									marginTop: 12,
									marginBottom: 12,
									color: "#000",
									fontFamily: 'Circular Std'
								}}>Período de envio 4x ao dia</Text>
								<Text style={styles.infoText}>1º - 07:00hs às 08:00hs</Text>
								<Text style={styles.infoText}>2º - 10:00hs às 11:00hs</Text>
								<Text style={styles.infoText}>3º - 13:00hs às 14:00hs</Text>
								<Text style={styles.infoText}>4º - 16:00hs às 17:00hs</Text>
						</View>
						<View
							style={{
								borderBottom: '1px solid '
							}}
						>
								<Text style={{
									textAlign: 'center',
									fontWeight: 'bold',
									fontSize: 20,
									marginTop: 12,
									marginBottom: 12,
									color: "#000",
									fontFamily: 'Circular Std'
								}}>Período de envio 1x ao dia</Text>
								<Text style={styles.infoText}>1º - 16:00hs às 17:00hs</Text>
						</View>

						<Pressable style={styles.buttonInfo} onPress={() => onPressShowTooltip()}>
							<Text style={styles.btnTextInfo}>Fechar</Text>
						</Pressable>
					</View>
				</View>
			)}
			<Warp>
				<Header
					title={'Notificações de email'}
					back={() => props.navigation.goBack()}
					add={() => addRef.current?.open()}
					lower={true}
				/>
				{loading ? (
					<Spinner />
				) : (
					<List
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={() => {
									getActionEvents();
									getEmailsUser();
								}}
							/>
						}>
            <TitleContainer>
              <Title>{userData.nome || ''}</Title>
            </TitleContainer>
            <TitleContainer>
              <Title>Movimentações</Title>
            </TitleContainer>
						{permissionPublications && (
							<>
								<ListItem>
									<ListContent>
										<ListText>Notificar por email quando não houver novas publicações</ListText>
										<Switch
											onValueChange={() => handleNoNewPublications()}
											style={{transform: [{scale: Platform.OS == 'ios' ? 0.7 : 1}]}}
											trackColor={{false: colors.fadedBlack, true: '#689F38'}}
											value={noNewMovementsAlert}
										/>
									</ListContent>
									<ListContent
										as={Animated.View}
										style={{
											overflow: 'hidden',
											flex: 1,
											maxHeight: activeOptionsNoNewMovements.interpolate({
												inputRange: [0, 1],
												outputRange: [0, 500],
											}),
										}}>
										<Options style={{height: 90}}>
											<RadioForm animation={true} style={{flex: 1}} >
												<Option as={RadioButton}>
													<RadioButtonInput
														obj={{
															label: 'Receber quatro vezes ao dia',
															value: getActionValue(-24),
														}}
														isSelected={getActionValue(-24)}
														onPress={value => handleNotificationMovements(-24, value)}
														borderWidth={1}
														buttonInnerColor={colors.primary}
														buttonOuterColor={colors.primary}
														buttonSize={12}
														buttonOuterSize={18}
													/>
													<View>
													<TouchableOpacity onPress={()=> onPressShowTooltip()} style={styles.touchElement}>
														{colorScheme === 'dark' ? (
															<Image source={require('assets/images/icons/info_icon_white.png')} />
														) : (
															<Image source={require('assets/images/icons/info_icon.png')} />
														)}
													</TouchableOpacity>
													<RadioButtonLabel
														obj={{
															label: 'Receber quatro vezes ao dia',
															value: getActionValue(-24),
														}}
														labelWrapStyle={{
															flex: 2,
														}}
														labelStyle={{
															color: colors.grayDarker,
															fontFamily: fonts.circularStdBook,
															fontSize: fonts.small,
															paddingRight: 22,
														}}
														onPress={value => handleNotificationMovements(-24, value)}
													/>
													</View>
												</Option>
												<Option as={RadioButton}>
													<RadioButtonInput
														obj={{
															label: 'Receber apenas uma vez ao final do dia',
															value: getActionValue(-25),
														}}
														isSelected={getActionValue(-25)}
														onPress={value => handleNotificationMovements(-25, value)}
														borderWidth={1}
														buttonInnerColor={colors.primary}
														buttonOuterColor={colors.primary}
														buttonSize={12}
														buttonOuterSize={18}
													/>
													<View>
													<TouchableOpacity onPress={()=> onPressShowTooltip()} style={styles.touchElement2}>
														{colorScheme === 'dark' ? (
															<Image source={require('assets/images/icons/info_icon_white.png')} />
														) : (
															<Image source={require('assets/images/icons/info_icon.png')} />
														)}
													</TouchableOpacity>

													<RadioButtonLabel
														numberOfLines={1}
														obj={{
															label: 'Receber apenas uma vez ao final do dia',
															value: getActionValue(-25),
														}}
														labelWrapStyle={{
															flex: 2,
														}}
														labelStyle={{
															color: colors.grayDarker,
															fontFamily: fonts.circularStdBook,
															fontSize: fonts.small,
															paddingLeft: 0,
															paddingRight: 22
														}}
														onPress={value => handleNotificationMovements(-25, value)}
													/>
													</View>
												</Option>
											</RadioForm>
										</Options>
									</ListContent>
								</ListItem>
								<ListItem>
									<ListContent>
										<ListText>Notificar por email quando houver novas publicações</ListText>
										<Switch
											onValueChange={() => handleNewPublications()}
											style={{transform: [{scale: Platform.OS == 'ios' ? 0.7 : 1}]}}
											trackColor={{false: colors.fadedBlack, true: '#689F38'}}
											value={movementsAlert}
										/>
									</ListContent>
									<ListContent
										as={Animated.View}
										style={{
											overflow: 'hidden',
											flex: 1,
											maxHeight: activeOptionsMovements.interpolate({
												inputRange: [0, 1],
												outputRange: [0, 500],
											}),
										}}>
										<Options style={{height: 90}}>
											<RadioForm animation={true} style={{flex: 1}}>
												<Option as={RadioButton}>
													<RadioButtonInput
														obj={{
															label: 'Enviar novas publicações na íntegra',
															value: getActionValue(-23),
														}}
														isSelected={getActionValue(-23)}
														onPress={value => handleNotificationMovements(-23, value)}
														borderWidth={1}
														buttonInnerColor={colors.primary}
														buttonOuterColor={colors.primary}
														buttonSize={12}
														buttonOuterSize={18}
													/>
													<RadioButtonLabel
														obj={{
															label: 'Enviar novas publicações na íntegra',
															value: getActionValue(-23),
														}}
														labelWrapStyle={{
															flex: 2,
														}}
														labelStyle={{
															color: colors.grayDarker,
															fontFamily: fonts.circularStdBook,
															fontSize: fonts.small,
															paddingRight: 22,
														}}
														onPress={value => handleNotificationMovements(-23, value)}
													/>
												</Option>
												<Option as={RadioButton}>
													<RadioButtonInput
														obj={{
															label: 'Enviar apenas o aviso de novas publicações',
															value: getActionValue(-1),
														}}
														isSelected={getActionValue(-1)}
														onPress={value => handleNotificationMovements(-1, value)}
														borderWidth={1}
														buttonInnerColor={colors.primary}
														buttonOuterColor={colors.primary}
														buttonSize={12}
														buttonOuterSize={18}
													/>
													<RadioButtonLabel
														numberOfLines={1}
														obj={{
															label: 'Enviar apenas o aviso de novas publicações',
															value: getActionValue(-1),
														}}
														labelWrapStyle={{
															flex: 2,
														}}
														labelStyle={{
															color: colors.grayDarker,
															fontFamily: fonts.circularStdBook,
															fontSize: fonts.small,
															paddingLeft: 0,
															paddingRight: 22,
														}}
														onPress={value => handleNotificationMovements(-1, value)}
													/>
												</Option>
												{/* {radioProps.map(obj => {
                          console.log(obj);
                          return (
                            <Option as={RadioButton}>
                              <RadioButtonInput
                                obj={obj}
                                isSelected={obj.value}
                                onPress={() => {
                                  toggleCheck(-23)
                                }}
                                borderWidth={1}
                                buttonInnerColor={colors.primary}
                                buttonOuterColor={colors.primary}
                                buttonSize={12}
                                buttonOuterSize={18}
                              />
                              <RadioButtonLabel
                                obj={obj}
                                labelStyle={{
                                  'color': colors.grayDarker,
                                  'fontFamily': fonts.circularStdBook,
                                  'fontSize': fonts.small,
                                  'paddingRight': 22,
                                }}
                                onPress={() => {
                                  toggleCheck(-1)
                                }}
                              />
                            </Option>
                          );
                        })} */}
											</RadioForm>
										</Options>
									</ListContent>
								</ListItem>
							</>
						)}
						{permissionProcesses && (
							<ListItem>
								<ListContent>
									<ListText>Notificar por email quando houver novos andamentos</ListText>
									<Switch
										onValueChange={() => handleNewMovements()}
										style={{transform: [{scale: Platform.OS == 'ios' ? 0.7 : 1}]}}
										trackColor={{false: colors.fadedBlack, true: '#689F38'}}
										value={processesAlert}
									/>
								</ListContent>
								<ListContent
									as={Animated.View}
									style={{
										overflow: 'hidden',
										flex: 1,
										maxHeight: activeOptionsProcesses.interpolate({
											inputRange: [0, 1],
											outputRange: [0, 500],
										}),
									}}>
									<Options style={{height: 105}}>
										<RadioForm animation={true} style={{flex: 1}}>
											<Option as={RadioButton}>
												<RadioButtonInput
													obj={{
														label: 'Enviar os processos que receberam novos andamentos',
														value: getActionValue(-31),
													}}
													isSelected={getActionValue(-31)}
													onPress={value => handleNotificationMovements(-31, value)}
													borderWidth={1}
													buttonInnerColor={colors.primary}
													buttonOuterColor={colors.primary}
													buttonSize={12}
													buttonOuterSize={18}
												/>
												<RadioButtonLabel
													obj={{
														label: 'Enviar os processos que receberam novos andamentos',
														value: getActionValue(-31),
													}}
													labelWrapStyle={{
														flex: 2,
													}}
													labelStyle={{
														color: colors.grayDarker,
														fontFamily: fonts.circularStdBook,
														fontSize: fonts.small,
														paddingRight: 22,
													}}
													onPress={value => handleNotificationMovements(-31, value)}
												/>
											</Option>
											<Option as={RadioButton}>
												<RadioButtonInput
													obj={{
														label: 'Enviar apenas o aviso de novos andamentos',
														value: getActionValue(-3),
													}}
													isSelected={getActionValue(-3)}
													onPress={value => handleNotificationMovements(-3, value)}
													borderWidth={1}
													buttonInnerColor={colors.primary}
													buttonOuterColor={colors.primary}
													buttonSize={12}
													buttonOuterSize={18}
												/>
												<RadioButtonLabel
													numberOfLines={1}
													obj={{
														label: 'Enviar apenas o aviso de novos andamentos',
														value: getActionValue(-3),
													}}
													labelWrapStyle={{
														flex: 2,
													}}
													labelStyle={{
														color: colors.grayDarker,
														fontFamily: fonts.circularStdBook,
														fontSize: fonts.small,
														paddingLeft: 0,
														paddingRight: 22,
													}}
													onPress={value => handleNotificationMovements(-3, value)}
												/>
											</Option>
										</RadioForm>
									</Options>
								</ListContent>
							</ListItem>
						)}
						{(permissionProcesses || permissionPublications) && (
							<ListItem>
								<ListContent>
									<Title>Também encaminhar para o(s) email(s) abaixo:</Title>
								</ListContent>

								<EmailsList>
									{emails.map((email, key) => (
										<EmailContent key={key}>
											<ListText>{email.email}</ListText>
											<ActionButton onPress={() => handleConfirmation(email)}>
												<MaterialIcons size={22} name="delete" color={colors.fadedBlack} />
											</ActionButton>
										</EmailContent>
									))}
								</EmailsList>
							</ListItem>
						)}
					</List>
				)}
				<Add ref={addRef} onRecordEmail={email => onRecordEmail(email)} />
				{renderConfirmation()}
			</Warp>
		</Container>
	);
};

const styles = StyleSheet.create({
	toolTipStyle: {
		shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
		bottom: 35,
		right: 10
	},
	toolTipStyle2: {
		shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
		bottom: 10,
		right: 10
	},
	touchElement: {
		zIndex: 10,
		position: 'absolute',
		right: -10,
		top: -3
	},
	touchElement2: {
		zIndex: 10,
		position: 'absolute',
		right: -10,
		top: -3
	},
	viewOverlayElement: {
		zIndex: 100,
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, .7)',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	viewInfo: {
		backgroundColor: '#fff',
		width: '100%',
		height: 'auto',
		display: 'flex',
		alignItems: 'center',
		borderRadius: 4
	},
	infoText: {
		fontFamily: 'Circular Std',
		fontStyle: 'normal',
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 24,
		color: 'rgba(0, 0, 0, 0.87)',
    opacity: 0.6,
		marginRight: 170
	},
	buttonInfo: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 24,
		paddingRight: 24,
		width: 300,
		height: 40,
		backgroundColor: '#2D2D2D',
		borderRadius: 4,
		marginTop: 24,
		marginBottom: 24,
	},
	btnTextInfo: {
		fontFamily: 'Circular Std',
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: 14,
		lineHeight: 24,
		textAlign: 'center',
		color: '#FFFFFF'
	}
});
