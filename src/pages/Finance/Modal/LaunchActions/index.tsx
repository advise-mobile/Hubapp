import React, {useEffect, forwardRef,useCallback, useState, useRef, useMemo} from 'react';

import {Platform, PermissionsAndroid} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RNFetchBlob from 'rn-fetch-blob';

import {TOKEN} from '@helpers/StorageKeys';

import Toast from 'react-native-simple-toast';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';

import ConfirmModal from '@components/ConfirmModal';

import { useNavigation } from '@react-navigation/native';

import { useRelease } from '@services/hooks/Finances/useReleases';

import {useDispatch} from 'react-redux';

import ToastNotifyActions from 'store/ducks/ToastNotify';

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
import ReleaseDuplicate from '../ReleaseDuplicate';
import ReleaseSendEmail from '../ReleaseSendEmail'

import {BASE_URL} from '@services/Api';

export default LauchActionsMenu = forwardRef(({item}, ref) => {

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {isLoadingRelease, deleteRelease, downloadRelease} = useRelease();

  const confirmationDeleteModalRef = useRef();

  const modalReleaseEditRef = useRef(null);
  const modalReleaseDuplicateRef = useRef(null);
  const modalReleaseSendEmailRef = useRef(null);
  
  const dirs = RNFetchBlob.fs.dirs;

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const closeModal = useCallback(() => ref.current?.close(), []);

  const [modalReleaseEditOpen, setModalReleaseEditOpen] = useState(false);
  const [modalReleaseDuplicateOpen, setModalReleaseDuplicateOpen] = useState(false);
  const [modalReleaseSendEmailOpen, setModalReleaseSendEmailOpen] = useState(false);

  const closeReleaseEditModal = ()=>{
		setModalReleaseEditOpen(false);
	}
  const closeReleaseDuplicateModal = ()=>{
		setModalReleaseDuplicateOpen(false);
	}

  const closeReleaseSendEmailModal = ()=>{
		setModalReleaseSendEmailOpen(false);
	}
  

  useEffect(() => {
    if(modalReleaseEditOpen){
      modalReleaseEditRef.current?.open();
    }
    if(modalReleaseDuplicateOpen){
      modalReleaseDuplicateRef.current?.open();
    }
    if(modalReleaseSendEmailOpen){
      modalReleaseSendEmailRef.current?.open();
    }


  }, [modalReleaseEditOpen, modalReleaseDuplicateOpen, modalReleaseSendEmailOpen]);

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
	},[item]);

  const requestPermission = useCallback(async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			);

			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			alert("Erro ao solicitar permissão de download!")
		}

		return false;
	});

	const handleDownloadRelease = useCallback(
		async () => {
			const downloadPromise = new Promise(async (resolve, reject) => {
				const havePermission = Platform.OS == 'ios' || (await requestPermission());

				if (!havePermission) return ;

				const token = await AsyncStorage.getItem(TOKEN);

				Toast.show('Download do lançamento iniciado, por favor, aguarde.');
				

				const filename = `${Date.now()}.pdf`;

				const path =
					Platform.OS == 'ios' ? dirs.DocumentDir + `/${filename}` : dirs.DCIMDir + `/${filename}`;

				RNFetchBlob.config({
					fileCache: true,
					path: path,
					addAndroidDownloads: {
						useDownloadManager: true,
						notification: true,
						mediaScannable: true,
						description: 'Lançamento disponibilizado via Advise Hub App',
						path: dirs.DCIMDir + `/${filename}`,
					},
				})
					.fetch(
						'GET',
						`${BASE_URL}/core/v1/parcelas-download?idsParcelas=${item.idParcelaFinanceiro}&tipoArquivo=pdf`,
						{
							Authorization: `Bearer ${token}`,
						},
					)
					.then(res => {
            dispatch(ToastNotifyActions.toastNotifyShow('Lançamento baixado com sucesso!',false));
							
						if (Platform.OS === 'ios') {
							RNFetchBlob.fs.writeFile(path, res.data, 'base64');
							RNFetchBlob.ios.openDocument(path);
						}

						
            RNFetchBlob.fs.readFile(res.data, 'base64').then(file => {
              resolve({
                file,
                fileName: filename,
              });
            });
						
					})
					.catch(err => {
            dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível baixar este lançamento',true));

						reject();
					});
			});

			return downloadPromise;
		},
		[item],
	);

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

      <Content onPress={() => setModalReleaseSendEmailOpen(true) }>
			<Icon>
				<MaterialIcons name={"mail"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Enviar por email</Label>
        </Row>
      </Content>

			<Content onPress={() => handleDownloadRelease()}>
			<Icon>
				<MaterialIcons name={"file-download"} size={24} color={colors.fadedBlack}/>
				</Icon>
        <Row >
          <Label>Download</Label>
        </Row>
      </Content>

			<Content onPress={() => setModalReleaseDuplicateOpen(true)}>
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

    {modalReleaseEditOpen && <ReleaseEdit item={item} ref={modalReleaseEditRef} onClose={closeReleaseEditModal}/>}
    {modalReleaseDuplicateOpen && <ReleaseDuplicate item={item} ref={modalReleaseDuplicateRef} onClose={closeReleaseDuplicateModal}/>}
    {modalReleaseSendEmailOpen && <ReleaseSendEmail item={item} ref={modalReleaseSendEmailRef} onClose={closeReleaseSendEmailModal}/>}
  
    {renderDeleteConfirmation}

  </>
  );
});
