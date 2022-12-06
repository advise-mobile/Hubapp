import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, Appearance} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AuthActions from '../../store/ducks/Auth';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../assets/styles';
import * as S from './styles';
import {BASE_URL} from 'services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from 'helpers/StorageKeys';
import Axios from 'axios';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { FormatDateBR } from "../../helpers/DateFunctions"

const TermsUse = props => {
	const { width } = useWindowDimensions();
	const colorScheme = Appearance.getColorScheme();
	const dispatch = useDispatch();

	const [acceptCheck, setAcceptCheck] = useState(false);
	const [term, setTerm] = useState({})

	const acceptTerms = useSelector(state => state.auth.acceptTerms);
	const loadingAcceptTerms = useSelector(state => state.auth.loadingAcceptTerms);
	const redirect = useSelector(state => state.auth.redirect);

	const source = {
		html: term.textoTermo
	};

	const handleAccept = () => {
		dispatch(AuthActions.termsUseRequest(true));
	};

	const checkRedirect = useCallback(() => {
		if (!!redirect) {
			dispatch(AuthActions.termsUseSuccess(false, false));
			props.navigation.dispatch(StackActions.replace('Login'));
			return;
		}
	}, [redirect]);

	const checkAcceptTerms = useCallback(() => {
		if (acceptTerms) {
			props.navigation.dispatch(StackActions.push('App'));
		}
	}, [acceptTerms]);

	useEffect(() => {
		checkRedirect();
		checkAcceptTerms();
	}, [acceptTerms, redirect]);

	useEffect(() => {
		async function getNewTermo() {
			const token = await AsyncStorage.getItem(TOKEN);
			const headers = { Authorization: `Bearer ${token}` };

			const { data } = await Axios.get(`${BASE_URL}/core/v1/termos/termo-uso-vigente`, {
				headers
			})

			let res = data.itens.map(item => {
				return item
			})

			setTerm({
				textoTermo: res[0].textoTermo,
				dataHoraPublicacaoTermo: FormatDateBR(res[0].dataHoraPublicacaoTermo)
			})
		}

		getNewTermo()

	}, [])


	console.log(term.textoTermo)
	const disabledButton = useMemo(() => !acceptCheck, [acceptCheck]);

	return (
		<View style={{flex: 1}}>
			<S.Container>
				<S.ContentWrapper>
					<S.TitleTerm>Termos de Uso</S.TitleTerm>
					<S.Subtitle>Licença de uso de software</S.Subtitle>
					<S.TextWrapper>
						<RenderHtml
							contantWitdh={width}
							source={source}
							 tagsStyles={{div: {
									color: colorScheme === 'dark' ? colors.mainWhite : colors.darkGray
							}}}
						/>
						<S.Title
							style={{fontSize: 20, marginBottom: 28 }}
						>
							Data de publicação: {term.dataHoraPublicacaoTermo}
						</S.Title>
					</S.TextWrapper>
					<S.AcceptTermsWrapper scheme={colorScheme}>
						<CheckBox
							lineWidth={1.5}
							boxType={'square'}
							value={acceptCheck}
							onValueChange={setAcceptCheck}
							animationDuration={0.2}
							tintColor={colors.primary}
							onCheckColor={colors.white}
							onFillColor={colors.primary}
							onTintColor={colors.primary}
							style={{width: 18, height: 18, marginRight: 12}}
						/>
						<S.TermsText color={colors.white}>Li e aceito os Termos de Uso</S.TermsText>
					</S.AcceptTermsWrapper>
					<S.AcceptButton
						onPress={handleAccept}
						activeOpacity={0.7}
						disabled={disabledButton || loadingAcceptTerms}>
						<S.AcceptButtonText>Aceitar</S.AcceptButtonText>
					</S.AcceptButton>
				</S.ContentWrapper>
			</S.Container>
		</View>
	);
};

export default TermsUse;

