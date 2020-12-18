import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { colors } from 'assets/styles';
import {
  Container,
  Title,
  Header,
  Footer
} from './styles';

export default Modal = forwardRef((props, ref) => {
  const renderHeader = () => (
    <Header>
      <Title>{props.title && props.title}</Title>
    </Header>
  );

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
      HeaderComponent={renderHeader}
      FooterComponent={renderFooter}
      handlePosition="inside"
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
    height: 300,
  }
});
