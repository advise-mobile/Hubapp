import React, {forwardRef, useCallback} from 'react';
import {Modalize} from 'react-native-modalize';

import {Container, Title, Header, Footer, ClearFilters, ClearText} from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';


export default Modal = forwardRef((props, ref) => {

	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

	const renderHeader = useCallback(
		() => (
			<Header>
				<Title>{props.title && props.title}</Title>

				{props.filters > 0 && (
					<ClearFilters onPress={() => props.clear()}>
						<ClearText>Limpar ({props.filters})</ClearText>
					</ClearFilters>
				)}
			</Header>
		),
		[props],
	);

	return (
		<Modalize
			ref={ref}
			adjustToContentHeight={true}
			modalStyle={{
				backgroundColor: colors.white,
				maxHeight: 50,
			}}
			childrenStyle={{maxHeight: props.maxHeight ? props.maxHeight : 400}}
			HeaderComponent={renderHeader}
			handlePosition="inside"
			handleStyle={{backgroundColor: colors.grayDarker, marginTop: 8}}
			disableScrollIfPossible={false}
			keyboardAvoidingOffset={40}
			avoidKeyboard={true}
			onClose={props.onClose}
			onOpen={props.onOpen}
			// FooterComponent={renderFooter}
			// keyboardAvoidingBehavior='height'
			// avoidKeyboardLikeIOS
		>
			<Container>
				{props.children}
				{props.footer && <Footer>{props.footer}</Footer>}
			</Container>
		</Modalize>
	);
});
