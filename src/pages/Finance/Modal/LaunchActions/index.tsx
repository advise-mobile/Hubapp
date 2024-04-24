import React, {useEffect, forwardRef,useCallback, useState, useRef, useMemo} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';

import ConfirmModal from '@components/ConfirmModal';

import { useNavigation } from '@react-navigation/native';

import { useRelease } from '@services/hooks/Finances/useReleases';

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

  const navigation = useNavigation();

  const {isLoadingRelease, deleteRelease} = useRelease();

  const confirmationDeleteModalRef = useRef();

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

  const handleDeleteModalCancel = useCallback(() => confirmationDeleteModalRef.current?.close(),[]);

  const handleDeleteModalSubmit = useCallback(async() => {
		
    
		if(item){
			const trash = await deleteRelease(item,handleDeleteModalCancel);		
			if(trash){
        navigation.reset({
          index:0,
          routes:[{name:'FinanceTab'}]
        })
			}
		}
	},[item]);

  const renderDeleteConfirmation = useMemo(
		() =>   		
			<ConfirmModal
				ref={confirmationDeleteModalRef}
				onCancel={handleDeleteModalCancel}
				onSubmit={handleDeleteModalSubmit} 
				cancelText='Cancelar'
				submitText='Sim, quero excluir'
				title='Deseja excluir?'
				description='Ao excluir um lançamento, você elimina todas as informações referentes ao mesmoo. A ação de excluir é definitiva e irreversível.'
				loading={isLoadingRelease}
			/>
		,
		[item,isLoadingRelease],
	);

  const handleDelete = useCallback(() => {
    confirmationDeleteModalRef.current?.open();			
	},[]);


  return (
  <>
  
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

			<Content onPress={handleDelete}>
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

  {renderDeleteConfirmation}

  </>

    
  );
});
