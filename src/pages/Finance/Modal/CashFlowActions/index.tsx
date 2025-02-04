import React, {forwardRef, useCallback, useState, useRef, useEffect} from 'react';

import {Platform, PermissionsAndroid} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ToastNotifyActions from 'store/ducks/ToastNotify';

import RNFetchBlob from 'rn-fetch-blob';

import {TOKEN} from '@helpers/StorageKeys';

import Toast from 'react-native-simple-toast';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from 'components/Modal';

import CashFlowSendEmail from '../CashFlowSendEmail'

import {Footer, Cancel, CancelText, Content, Row, Label, Icon} from './styles';

import {useDispatch} from 'react-redux';

import {BASE_URL} from '@services/Api';

// Add UseTheme para pegar o tema global adicionado
import {useTheme} from 'styled-components';

export default CashFlowActions = forwardRef((props, ref) => {

  const dispatch = useDispatch();

  const {filters} = props;

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const dirs = RNFetchBlob.fs.dirs;

  	const modalCashFlowSendEmailRef = useRef(null);

  	const [modalCashFlowSendEmailOpen, setModalCashFlowSendEmailOpen] = useState(false);

	const closeCashFlowSendEmailModal = ()=>{
		setModalCashFlowSendEmailOpen(false);
	}

	useEffect(() => {
		if(modalCashFlowSendEmailOpen){
		modalCashFlowSendEmailRef.current?.open();
		}

	}, [ modalCashFlowSendEmailOpen]);


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

  const handleDownloadCashFlow = useCallback(
	async () => {
		const downloadPromise = new Promise(async (resolve, reject) => {
			const havePermission = Platform.OS == 'ios' || (await requestPermission());

			if (!havePermission) return ;

			const token = await AsyncStorage.getItem(TOKEN);

			Toast.show('Download do fluxo de caixa iniciado, por favor, aguarde.');
			
			// - quando for anual muda o endpoint segundo documentacao
			const endpoint = `${BASE_URL}/core/v1/saldos-contas-financeiro/download?dataInicio=${filters.dataSaldo}&dataFim=${filters.dataFim}&tipoArquivo=pdf`;

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
					description: 'Fluxo de caixa disponibilizado via Advise Hub App',
					path: dirs.DCIMDir + `/${filename}`,
				},
			}).fetch(
					'GET',
					`${endpoint}`,
					{
						Authorization: `Bearer ${token}`,
					},
			).then(res => {
				dispatch(ToastNotifyActions.toastNotifyShow('Fluxo de caixa baixado com sucesso!',false));
						
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
					
			}).catch(err => {
				dispatch(ToastNotifyActions.toastNotifyShow('Não foi possível baixar este fluxo de caixa',true));
					reject();
				});
		});

		return downloadPromise;
	},
	[filters],
  );

	const closeModal = useCallback(() => ref.current?.close(), []);

	const footer = () => (
		<Footer>
			<Cancel onPress={() => closeModal()}>
				<CancelText>Cancelar</CancelText>
			</Cancel>
		</Footer>
	);

	return (
		<>
			<Modal maxHeight={500} ref={ref} footer={footer()}>


			<Content onPress={() => setModalCashFlowSendEmailOpen(true) }>
					<Icon>
						<MaterialIcons name={'mail'} size={24} color={colors.fadedBlack} />
					</Icon>
					<Row>
						<Label>Enviar por email</Label>
					</Row>
				</Content>

				<Content onPress={() =>  handleDownloadCashFlow() }>
					<Icon>
						<MaterialIcons name={'file-download'} size={24} color={colors.fadedBlack} />
					</Icon>
					<Row>
						<Label>Download </Label>
					</Row>
				</Content>
			</Modal>
			{modalCashFlowSendEmailOpen && <CashFlowSendEmail filters={filters} ref={modalCashFlowSendEmailRef} onClose={closeCashFlowSendEmailModal}/>}
		</>
	);
});
