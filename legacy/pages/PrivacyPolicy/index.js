import React from 'react';
import {View} from 'react-native';
import * as S from './styles';

import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import html from './html'

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const PrivacyPolicy = props => {
	const { width } = useWindowDimensions();
	
	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;


	const source = {
		html: html
	};

	const handleGoback = () => {
		props.navigation.goBack();
	}

	return (
		<View style={{flex: 1}}>
			<S.Container>
				<S.ContentWrapper>
					<S.TitleTerm>Política de Privacidade</S.TitleTerm>
			
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
						</S.Title>
					</S.TextWrapper>

							<S.AcceptButton
								onPress={handleGoback}
								activeOpacity={0.7}>
								<S.AcceptButtonText>Voltar</S.AcceptButtonText>
							</S.AcceptButton>
						
					
				</S.ContentWrapper>
			</S.Container>
		</View>
	);
};

export default PrivacyPolicy;

