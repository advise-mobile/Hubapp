import React, {
  forwardRef,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';

import { Platform, PermissionsAndroid } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ToastNotifyActions from '@lstore/ducks/ToastNotify';

import RNFetchBlob from 'rn-fetch-blob';

import { TOKEN } from '@lhelpers/StorageKeys';

import Toast from 'react-native-simple-toast';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Modal from '@lcomponents/Modal';

import CashFlowSendEmail from '../CashFlowSendEmail';

import {
  Footer,
  Cancel,
  CancelText,
  Content,
  Row,
  Label,
  Icon,
} from './styles';

import { useDispatch } from 'react-redux';

import { BASE_URL } from '@lservices/Api';

// Add UseTheme para pegar o tema global adicionado
import { useTheme } from 'styled-components';

export default CashFlowActions = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { filters } = props;

  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;

  const dirs = RNFetchBlob.fs.dirs;

  const modalCashFlowSendEmailRef = useRef(null);

  const [modalCashFlowSendEmailOpen, setModalCashFlowSendEmailOpen] =
    useState(false);

  const closeCashFlowSendEmailModal = () => {
    setModalCashFlowSendEmailOpen(false);
  };

  useEffect(() => {
    if (modalCashFlowSendEmailOpen) {
      modalCashFlowSendEmailRef.current?.open();
    }
  }, [modalCashFlowSendEmailOpen]);

  const closeModal = useCallback(() => ref.current?.close(), []);

  const requestPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        // Para Android 13 (API 33) e superior, não precisamos de permissão para downloads
        if (Platform.Version >= 33) {
          return true;
        }

        // Para Android 12 e inferior, precisamos da permissão de armazenamento
        const permission =
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const status = await PermissionsAndroid.request(permission, {
          title: 'Permissão necessária',
          message:
            'O app precisa de acesso ao armazenamento para baixar arquivos.',
          buttonPositive: 'OK',
        });

        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      dispatch(
        ToastNotifyActions.toastNotifyShow(
          'Erro ao solicitar permissão de download!',
          true,
        ),
      );
      return false;
    }
  }, [dispatch]);

  const handleDownloadCashFlow = useCallback(async () => {
    closeModal();

    try {
      const havePermission =
        Platform.OS === 'ios' || (await requestPermission());

      if (!havePermission) {
        return;
      }

      const token = await AsyncStorage.getItem(TOKEN);

      if (!token) {
        dispatch(
          ToastNotifyActions.toastNotifyShow(
            'Erro de autenticação. Faça login novamente.',
            true,
          ),
        );
        return;
      }

      Toast.show('Download do fluxo de caixa iniciado, por favor, aguarde.');

      // - quando for mensal (period === 4) muda o endpoint segundo documentacao
      const endpoint =
        filters.period === 4
          ? `${BASE_URL}/core/v1/saldos-contas-financeiro/download/mensal?dataInicio=${filters.dataSaldo}&dataFim=${filters.dataFim}&tipoArquivo=pdf`
          : `${BASE_URL}/core/v1/saldos-contas-financeiro/download?dataSaldo=${filters.dataSaldo}&dataFim=${filters.dataFim}&tipoArquivo=pdf`;

      const filename = `${Date.now()}.pdf`;

      const path =
        Platform.OS === 'ios'
          ? dirs.DocumentDir + `/${filename}`
          : dirs.DCIMDir + `/${filename}`;

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
      })
        .fetch('GET', `${endpoint}`, {
          Authorization: `Bearer ${token}`,
        })
        .then(res => {
          dispatch(
            ToastNotifyActions.toastNotifyShow(
              'Fluxo de caixa baixado com sucesso!',
              false,
            ),
          );

          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.writeFile(path, res.data, 'base64');
            RNFetchBlob.ios.openDocument(path);
          }
        })
        .catch(err => {
          dispatch(
            ToastNotifyActions.toastNotifyShow(
              'Não foi possível baixar este fluxo de caixa',
              true,
            ),
          );
        });
    } catch (err) {
      dispatch(
        ToastNotifyActions.toastNotifyShow(
          'Não foi possível baixar este fluxo de caixa',
          true,
        ),
      );
    }
  }, [filters, dispatch, closeModal, requestPermission]);

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
        <Content onPress={() => setModalCashFlowSendEmailOpen(true)}>
          <Icon>
            <MaterialIcons name={'mail'} size={24} color={colors.fadedBlack} />
          </Icon>
          <Row>
            <Label>Enviar por email</Label>
          </Row>
        </Content>

        <Content onPress={() => handleDownloadCashFlow()}>
          <Icon>
            <MaterialIcons
              name={'file-download'}
              size={24}
              color={colors.fadedBlack}
            />
          </Icon>
          <Row>
            <Label>Download </Label>
          </Row>
        </Content>
      </Modal>
      {modalCashFlowSendEmailOpen && (
        <CashFlowSendEmail
          filters={filters}
          ref={modalCashFlowSendEmailRef}
          onClose={closeCashFlowSendEmailModal}
        />
      )}
    </>
  );
});
