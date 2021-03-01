import React, { forwardRef, useCallback, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import Toast from 'react-native-simple-toast';

import { FormatDateBR } from 'helpers/DateFunctions';

import ToastNotifyActions from 'store/ducks/ToastNotify';
import { useDispatch } from 'react-redux';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';
import { Share } from 'components/Share';

import { BASE_URL, getLogin } from 'services/Api';

import { colors } from 'assets/styles';
import {
  Submit,
  SubmitText,
  Content,
  Option,
  OptionText,
} from './styles';

export default Options = forwardRef((props, ref) => {
  const jurisprudence = props.jurisprudence;
  const [downloading, setDownloading] = useState(false);
  const dirs = RNFetchBlob.fs.dirs;
  const dispatch = useDispatch();

  const footer = () => (
    <Submit onPress={() => ref.current?.close()}>
      <SubmitText>Cancelar</SubmitText>
    </Submit>
  );

  const requestPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }

    return false;
  });

  const download = useCallback(async () => {
    const havePermission = Platform.OS == 'ios' || requestPermission();

    if (!havePermission) {
      setDownloading(false);
      ref.current?.close();
      return;
    }

    await getLogin();

    const token = await AsyncStorage.getItem('@Advise:token');

    setDownloading(true);

    Toast.show('Download da jurisprudência iniciado, por favor, aguarde.');

    RNFetchBlob.config({
      fileCache: true,
      path: (Platform.OS == 'ios') ? dirs.DocumentDir + `/${Date.now()}.zip` : dirs.DCIMDir + `/${Date.now()}.zip`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        mime: 'application/zip',
        description: 'Jurisprudência baixada com sucesso!',
        path: dirs.DCIMDir + `/${Date.now()}.zip`,
      }
    })
      .fetch('GET', `${BASE_URL}/core/v1/jurisprudencia-integras?linkIntegra=${jurisprudence.linkIntegra}`, {
        Authorization: `Bearer ${token}`
      })
      .then(() => {
        dispatch(
          ToastNotifyActions.toastNotifyShow(
            'Jurisprudência baixada com sucesso!',
            false
          )
        );
      })
      .catch((err) => {
        dispatch(
          ToastNotifyActions.toastNotifyShow(
            'Erro ao baixar Jurisprudência, tente novamente mais tarde.',
            true
          )
        );
      })
      .finally(() => {
        setDownloading(false);
        // ref.current?.close();
      });
  }, [jurisprudence]);

  const quote = useCallback(() => {
    let quoteText = `${jurisprudence.titulo}\n`;
    quoteText += `(${jurisprudence.siglaTribunal} - ${jurisprudence.ementa})\n\n`;
    quoteText += `(${jurisprudence.siglaTribunal} ${jurisprudence.diario} - ${jurisprudence.tipoRecurso}: ${jurisprudence.numeroRecurso},`;
    quoteText += `Relator: ${jurisprudence.nomeRelator.toUpperCase()}, Data de Publicação: ${FormatDateBR(jurisprudence.dataPublicacao)})`;

    Clipboard.setString(quoteText);

    dispatch(
      ToastNotifyActions.toastNotifyShow(
        'Ementa copiada para a área de transferência',
        false
      )
    );

    ref.current?.close();
  }, [jurisprudence]);

  const share = useCallback(() => {
    let text = '';
    text += `${capitalize(jurisprudence.nomeTribunal)}\n\n`;
    text += `${jurisprudence.dataPublicacao && 'Data de publicação: ' + FormatDateBR(jurisprudence.dataPublicacao)}\n`;
    text += `${jurisprudence.numeroRecurso && 'Recurso: ' + jurisprudence.numeroRecurso}\n`;
    text += `${jurisprudence.nomeRelator && 'Relator: ' + jurisprudence.nomeRelator}\n`;
    text += `${jurisprudence.orgaoJulgador && 'Órgão julgador: ' + jurisprudence.orgaoJulgador}\n`;
    text += `${jurisprudence.grupo && 'Grupos: ' + jurisprudence.grupo.join(", ")}\n`;
    text += `\n${jurisprudence.titulo && jurisprudence.titulo}\n`;
    text += `${jurisprudence.ementa && jurisprudence.ementa}\n`;

    const title = capitalize(jurisprudence.nomeTribunal);

    ref.current?.close();

    Share({
      message: text,
      title: title,
    });
  }, [jurisprudence]);

  const capitalize = useCallback(s => s.replace(/(?:^|\s|["'([{])+\S/g, l => l.toUpperCase()), []);

  const openModalEmail = useCallback(() => {
    ref.current?.close();

    props.openEmail();
  }, []);

  return (
    <Modal ref={ref} title="O que você deseja?" footer={footer()}>
      <Content>
        <Option onPress={() => download()} disabled={downloading}>
          {downloading ? <Spinner height='auto' size={22} /> : <MaterialIcons name="get-app" size={24} color={colors.fadedBlack} />}
          <OptionText>Baixar íntegra</OptionText>
        </Option>
        <Option onPress={() => quote()}>
          <MaterialIcons name="format-quote" size={24} color={colors.fadedBlack} />
          <OptionText>Ementa para citação</OptionText>
        </Option>
        <Option onPress={() => openModalEmail()}>
          <MaterialIcons name="mail" size={24} color={colors.fadedBlack} />
          <OptionText>Enviar por email</OptionText>
        </Option>
        <Option onPress={() => share()}>
          <MaterialIcons name="share" size={24} color={colors.fadedBlack} />
          <OptionText>Compartilhar</OptionText>
        </Option>
      </Content>
    </Modal>
  );
});
