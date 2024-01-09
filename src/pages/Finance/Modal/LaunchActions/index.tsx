import React, { forwardRef,useCallback, useState} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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


export default More = forwardRef((props, ref) => {

	const [editMode, setEditMode] = useState(false);

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
    <Modal maxHeight={500} ref={ref} footer={footer()} >

      <Content>
			<Icon>
				<MaterialIcons name={"edit"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Editar</Label>
        </Row>
      </Content>

			<Content>
			<Icon>
				<MaterialIcons name={"mail"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Enviar por email</Label>
        </Row>
      </Content>

			<Content>
			<Icon>
				<MaterialIcons name={"file-download"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Download</Label>
        </Row>
      </Content>

			<Content>
			<Icon>
				<MaterialIcons name={"file-copy"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Duplicar</Label>
        </Row>
      </Content>

			<Content>
			<Icon>
				<MaterialIcons name={"delete"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Excluir</Label>
        </Row>
      </Content>


    </Modal >
  );
});
