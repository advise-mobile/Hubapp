import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react';
import {Appearance, Keyboard, KeyboardAvoidingView, Modal} from 'react-native';
import ToastNotifyActions from 'store/ducks/ToastNotify';
import JurisprudenceActions from 'store/ducks/Jurisprudence';

import {useDispatch, useSelector} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {PermissionsGroups, checkPermission} from 'helpers/Permissions';

import Header from 'components/Header';
import HasNotPermission from 'components/HasNotPermission';

import Blocked from 'pages/Blocked';

import {Container, Warp} from 'assets/styles/general';
import {
	Content,
	Image,
	Title,
	Subtitle,
	SearchBar,
	SearchInput,
	SearchButton,
	SearchOverlay,
	ActionButton,
	ActionButtonText,
	ModalView,
	ModalOverlay,
	ModalContent,
	ModalTitle,
	ModalButton,
	ModalTextButton,
} from './styles';

import {colors} from 'assets/styles';

import ReportersModal from './Reporters';

const colorScheme = Appearance.getColorScheme();

const permissionImage =
	colorScheme == 'dark'
		? require('assets/images/permissions/jurisprudence_white.png')
		: require('assets/images/permissions/jurisprudence.png');
const image =
	colorScheme == 'dark'
		? require('assets/images/jurisprudence_white.png')
		: require('assets/images/jurisprudence.png');

export default function Jurisprudence(props) {
	const reportersRef = useRef();
	const resourceRef = useRef();
	const reporterRef = useRef();

	const active = useSelector(state => state.auth.active);
	const trigger = useSelector(state => state.jurisprudence.trigger);
	const loading = useSelector(state => state.jurisprudence.loading);

	const [term, setTerm] = useState('');
	const [resource, setResource] = useState('');
	const [reporter, setReporter] = useState('');
	const [hasPermission, setPermission] = useState(false);
	const [showModal, toggleModal] = useState(false);
	const [termErr, setTermErr] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		props.navigation.addListener('beforeRemove', e => {
			e.preventDefault();

			return;
		});
	}, []);

	useEffect(() => {
		checkPermission(PermissionsGroups.JURISPRUDENCE).then(permission => setPermission(permission));
	}, [props]);

	useEffect(() => {
		if (term) {
			clearValues();
		}
	}, [trigger]);

	const searchKeyword = useCallback(async () => {
		setTermErr(term.length < 3);
		if (term.length < 3) {
			dispatch(
				ToastNotifyActions.toastNotifyShow('O campo deve conter no mínimo 3 caracteres.', true),
			);

			return;
		}

		Keyboard.dismiss();

		// dispatch(
		// 	JurisprudenceActions.jurisprudenceRequest({
		// 		term: term,
		// 		page: 1,
		// 		filters: {
		// 			relator: reporter,
		// 			numeroRecurso: resource,
		// 		},
		// 	}),
		// );

		props.navigation.navigate('JurisprudenceList', {term, reporter, resource});

		// props.navigation.navigate('JurisprudenceList', {term: term});
		// setTerm('');
		// return;
	}, [term, reporter, resource]);

	const renderRequiredModal = useMemo(
		() =>
			showModal && (
				<ModalView>
					<Modal
						animationType="fade"
						transparent={true}
						visible={showModal}
						onRequestClose={() => toggleModal(!showModal)}>
						<ModalOverlay onPress={() => toggleModal(!showModal)} activeOpacity={1}>
							<ModalContent>
								<ModalTitle>Insira um termo de pesquisa para utilizar este campo.</ModalTitle>
								<ModalButton onPress={() => toggleModal(!showModal)}>
									<ModalTextButton>Fechar</ModalTextButton>
								</ModalButton>
							</ModalContent>
						</ModalOverlay>
					</Modal>
				</ModalView>
			),
		[showModal],
	);

	const clearValues = useCallback(() => {
		setTerm('');
		setResource('');
		setReporter('');
	});

	const clearDependencies = useCallback(() => {
		setResource('');
		setReporter('');
	});

	return (
		<Container>
			{active ? (
				<Warp>
					<Header title="Jurisprudência" />
					{hasPermission ? (
						<KeyboardAvoidingView
							style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
							behavior="height"
							enabled>
							<Content>
								<Image source={image} />
								<Title>Jurisprudência</Title>
								<Subtitle>
									Consulta ao conjunto de decisões dos tribunais brasileiros publicadas desde 1988.
								</Subtitle>
								<SearchBar error={termErr}>
									<SearchInput
										error={termErr}
										autoCorrect={false}
										autoCapitalize="none"
										placeholder="Termo de pesquisa"
										placeholderTextColor={colors.grayLight}
										value={term}
										onChangeText={typedSearch => {
											typedSearch ? setTerm(typedSearch) : clearValues();
											typedSearch ? setTermErr(typedSearch.length < 3) : setTermErr(false);
											typedSearch.length < 3 && clearDependencies();
										}}
										onSubmitEditing={() => resourceRef.current?.focus()}
										returnKeyType="next"
									/>
									<SearchButton onPress={() => clearValues()} show={term.length > 0 ? true : false}>
										<MaterialIcons size={20} name="close" color={colors.fadedBlack} />
									</SearchButton>
								</SearchBar>
								<SearchBar disabled={term.length < 3}>
									{term.length < 3 && (
										<SearchOverlay
											activeOpacity={1}
											display={term.length < 3}
											onPress={() => term.length < 3 && toggleModal(true)}
										/>
									)}

									<SearchInput
										ref={resourceRef}
										editable={term.length >= 3}
										autoCorrect={false}
										autoCapitalize="none"
										placeholder="Número do recurso"
										placeholderTextColor={term.length < 3 ? colors.grayLight : '#BDBDBD'}
										value={resource}
										onChangeText={typedSearch => setResource(typedSearch)}
										onSubmitEditing={() => reporterRef.current?.focus()}
										returnKeyType="next"
									/>
									<SearchButton
										onPress={() => setResource('')}
										show={resource.length > 0 ? true : false}>
										<MaterialIcons size={20} name="close" color={colors.fadedBlack} />
									</SearchButton>
								</SearchBar>
								<SearchBar disabled={term.length < 3}>
									{term.length < 3 && (
										<SearchOverlay
											activeOpacity={1}
											display={term.length < 3}
											onPress={() => term.length < 3 && toggleModal(true)}
										/>
									)}
									<SearchInput
										ref={reporterRef}
										editable={term.length >= 3}
										autoCorrect={false}
										autoCapitalize="none"
										placeholder="Nome do relator"
										placeholderTextColor={term.length < 3 ? colors.grayLight : '#BDBDBD'}
										value={reporter}
										onChangeText={typedSearch => setReporter(typedSearch)}
										onSubmitEditing={searchKeyword}
										returnKeyType="search"
										onFocus={() => term.length >= 3 && reportersRef.current?.open()}
									/>
									<SearchButton
										onPress={() => setReporter('')}
										show={reporter.length > 0 ? true : false}>
										<MaterialIcons size={20} name="close" color={colors.fadedBlack} />
									</SearchButton>
								</SearchBar>
								<ActionButton disabled={loading} onPress={searchKeyword} loading={loading}>
									<ActionButtonText loading={loading}>
										{loading ? 'Carregando...' : 'Buscar jurisprudência'}
									</ActionButtonText>
								</ActionButton>
							</Content>
						</KeyboardAvoidingView>
					) : (
						<Content>
							<HasNotPermission
								image={permissionImage}
								title={`O maior banco de\nJurisprudência do Brasil!`}
								body="Realize consultas jurisprudenciais dentro da sua solução de forma rápida e simples. Filtros inteligentes para consultar decisões que realmente importam para o seu caso"
							/>
						</Content>
					)}
				</Warp>
			) : (
				<Blocked />
			)}

			<ReportersModal ref={reportersRef} selectReporter={name => setReporter(name)} />
			{renderRequiredModal}
		</Container>
	);
}
