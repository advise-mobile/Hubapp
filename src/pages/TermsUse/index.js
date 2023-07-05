import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AuthActions from '../../store/ducks/Auth';
import CheckBox from '@react-native-community/checkbox';
import * as S from './styles';
import {BASE_URL} from 'services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from 'helpers/StorageKeys';
import Axios from 'axios';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { FormatDateBR } from "../../helpers/DateFunctions"

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const TermsUse = props => {
	const { width } = useWindowDimensions();
	
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

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
		dispatch(AuthActions.termsUseRequest(true))
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

	
	const handleGoback = () => {
		props.navigation.goBack();
	}

	useEffect(() => {
		checkRedirect();
		//checkAcceptTerms();
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

	}, [term])

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
								color: colorUseTheme.name === 'dark' ? colors.mainWhite : colors.darkGray
							}, h3: {
								marginBottom: '.1rem',
								marginTop: -2
							}, ol: {
								paddingBottom: '2rem'
							}, ul: {
								paddingBottom: '2rem'
							}}}
						/>
						<S.Title
							style={{fontSize: 20, marginBottom: 28 }}
						>
							Data de publicação: {term.dataHoraPublicacaoTermo}
						</S.Title>
					</S.TextWrapper>
					{
					acceptTerms ? (
						<>
							<S.AcceptTermsWrapper>		
								<S.TermsText color={colors.white}>Termo de uso já aceito anteriormente</S.TermsText>
							</S.AcceptTermsWrapper>
							<S.AcceptButton
								onPress={handleGoback}
								activeOpacity={0.7}>
								<S.AcceptButtonText>Voltar</S.AcceptButtonText>
							</S.AcceptButton>
						</>
						) :
						(
							<>
							<S.AcceptTermsWrapper>
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
							</>
						)
					}
				</S.ContentWrapper>
			</S.Container>
		</View>
	);
};

export default TermsUse;

