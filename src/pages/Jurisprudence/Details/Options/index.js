import React, { forwardRef, useCallback, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob'
import Toast from 'react-native-simple-toast';
import moment from 'moment';

import { TOKEN } from 'helpers/StorageKeys';

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
  const term = props.term;
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
    const params = {
      CodEmenta: jurisprudence.codEmenta,
      NumeroRecursos: jurisprudence.numeroRecurso,
      termo: term,
      tipoArquivo: 'pdf'
    };

    const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    const havePermission = Platform.OS == 'ios' || requestPermission();

    if (!havePermission) {
      setDownloading(false);
      ref.current?.close();
      return;
    }

    await getLogin();

    const token = await AsyncStorage.getItem(TOKEN);

    setDownloading(true);

    Toast.show('Download da jurisprudência iniciado, por favor, aguarde.');

    const path = (Platform.OS == 'ios') ? dirs.DocumentDir + `/${Date.now()}.pdf` : dirs.DCIMDir + `/${Date.now()}.pdf`;

    RNFetchBlob.config({
      fileCache: true,
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        description: 'Jurisprudência disponibilizada via Advise Hub App!',
        path: dirs.DCIMDir + `/${Date.now()}.pdf`,
      }
    })
      .fetch('GET', `${BASE_URL}/core/v1/jurisprudencias-download?${queryParams}`, {
        Authorization: `Bearer ${token}`
      })
      .then(res => {
        dispatch(ToastNotifyActions.toastNotifyShow('Jurisprudência baixada com sucesso!', false));

        if (Platform.OS === "ios") {
          RNFetchBlob.fs.writeFile(path, res.data, 'base64');
          RNFetchBlob.ios.openDocument(path);
        }
      })
      .catch(() => dispatch(ToastNotifyActions.toastNotifyShow('Erro ao baixar Jurisprudência, tente novamente mais tarde.', true)))
      .finally(() => {
        setDownloading(false);
        ref.current?.close();
      });
  }, [jurisprudence]);

  const quote = useCallback(() => {

    const { 
      titulo, 
      siglaTribunal, 
      ementa, 
      diario, 
      tipoRecurso, 
      numeroRecurso, 
      nomeRelator, 
      dataPublicacao, 
      dataJulgamento 
    } = jurisprudence;

    const formattedDate = dataPublicacao ? 
      `Data de Publicação: ${moment(dataPublicacao, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}`
      :
      dataJulgamento ? 
      `Data de Julgamento: ${moment(dataJulgamento, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}`
      :
      `Data de Publicação: Não informado`;

    let quoteText = `${titulo}\n`;
    quoteText += `(${siglaTribunal} - ${ementa})\n\n`;
    quoteText += `(${siglaTribunal} ${diario} - ${tipoRecurso}: ${numeroRecurso},`;
    quoteText += `Relator: ${nomeRelator.toUpperCase()}, ${formattedDate})`;

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

    const { 
      titulo, 
      nomeTribunal,
      ementa,
      grupo, 
      numeroRecurso, 
      nomeRelator, 
      orgaoJulgador,
      dataPublicacao, 
      dataJulgamento 
    } = jurisprudence;

    const formattedDate = dataPublicacao ? 
      `Data de Publicação: ${moment(dataPublicacao, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}`
      :
      dataJulgamento ? 
      `Data de Julgamento: ${moment(dataJulgamento, 'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY')}`
      :
      `Data de Publicação: Não informado`;
    
    const formattedGroup = grupo.length > 1 ? 
      grupo.join(", ") 
      : 
      grupo[0] !== 'undefined' ? grupo[0] : 'Outros';

    let text = '';
    text += `${capitalize(nomeTribunal)}\n\n`;
    text += `${formattedDate}\n`;
    text += `${numeroRecurso && 'Recurso: ' + numeroRecurso}\n`;
    text += `${nomeRelator && 'Relator: ' + nomeRelator}\n`;
    text += `${orgaoJulgador && 'Órgão julgador: ' + orgaoJulgador}\n`;
    text += `Grupos: ${formattedGroup}\n`;
    text += `\n${titulo && titulo}\n`;
    text += `${ementa && ementa}\n`;

    const title = capitalize(nomeTribunal);

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
          <OptionText>Baixar jurisprudência</OptionText>
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
