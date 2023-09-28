import React, { forwardRef,useCallback} from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'components/Modal';

import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Row,
  Label,
	Icon,
} from './styles';

// Add UseTheme para pegar o tema global adicionado
import { useTheme } from 'styled-components';

export default Add = forwardRef((props, ref) => {

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const closeModal = useCallback(() => ref.current?.close(), []);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
    </Footer>
  );


  return (
    <Modal maxHeight={300} ref={ref} title="Cadastrar" footer={footer()} >

      <Content>
        <Row >
          <Label>Despesa</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.realWhites}/>
				</Icon>

      </Content>

			<Content>
        <Row >
          <Label>Receita</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.realWhites}/>
				</Icon>
      </Content>

			<Content>
        <Row >
          <Label>Categoria</Label>
        </Row>
				<Icon>
				<FontAwesome name="chevron-right" color={colors.realWhites}/>
				</Icon>
      </Content>
    </Modal >
  );
});
