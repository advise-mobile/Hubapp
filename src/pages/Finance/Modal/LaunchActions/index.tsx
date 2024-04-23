import React, {useEffect, forwardRef,useCallback, useState, useRef} from 'react';

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

import ReleaseEdit from '../ReleaseEdit';

export default LauchActionsMenu = forwardRef(({item}, ref) => {

	const [editMode, setEditMode] = useState(false);

  const modalReleaseEditRef = useRef(null);


  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const closeModal = useCallback(() => ref.current?.close(), []);

  const [modalReleaseEditOpen, setModalReleaseEditOpen] = useState(false);

  const closeReleaseEditModal = ()=>{
		setModalReleaseEditOpen(false);
	}
  useEffect(() => {
    if(modalReleaseEditOpen){
      // alert(modalReleaseEditOpen)
      modalReleaseEditRef.current?.open();
    }
}, [modalReleaseEditOpen]);

  const footer = () => (
    <Footer>
      <Cancel onPress={() => closeModal()}>
        <CancelText>Cancelar</CancelText>
      </Cancel>
    </Footer>
  );


  return (<>
  
    <Modal maxHeight={500} ref={ref} footer={footer()} >

      <Content onPress={() => setModalReleaseEditOpen(true) }>
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

    {
      modalReleaseEditOpen && <ReleaseEdit item={item} ref={modalReleaseEditRef} onClose={closeReleaseEditModal}/> 
    }

  </>

    
  );
});
