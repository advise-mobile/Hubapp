import React, { forwardRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { colors } from 'assets/styles';
import {
  Container,
  Title,
  Header,
  Footer,
  ClearFilters,
  ClearText,
} from './styles';

export default Modal = forwardRef((props, ref) => {
  const renderHeader = useCallback(() => (
    <Header>
      <Title>{props.title && props.title}</Title>

      {props.filters > 0 &&
        <ClearFilters onPress={() => props.clear()}>
          <ClearText>Limpar ({props.filters})</ClearText>
        </ClearFilters>
      }
    </Header>
  ), [props]);

  const renderFooter = () => (
    <Footer>
      {props.footer}
    </Footer>
  );

  return (
    <Modalize
      ref={ref}
      adjustToContentHeight={true}
      modalStyle={styles.modal}
      childrenStyle={{ maxHeight: 400 }}
      HeaderComponent={renderHeader}
      FooterComponent={renderFooter}
      handlePosition="inside"
      disableScrollIfPossible={false}
      keyboardAvoidingOffset={40}
      // keyboardAvoidingBehavior='height'
      // avoidKeyboardLikeIOS
      avoidKeyboard={true}
    >
      <Container>
        {props.children}
      </Container>
    </Modalize>
  );
});


const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    maxHeight: 50,
  }
});
