import React, { useState, useEffect, useCallback } from 'react';
import { Switch } from 'react-native';
import { useDispatch } from 'react-redux';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import ToastNotifyActions from 'store/ducks/ToastNotify';

import useDebouncedEffect from 'use-debounced-effect';

import { getLoggedUser } from 'helpers/Permissions';
import { getNotificationSettings, changeNotificationSettings } from 'helpers/Pushs';

import { colors } from 'assets/styles';
import { Container, Warp } from 'assets/styles/general';
import {
  List,
  ListItem,
  ListContent,
  ListText,
  Title,
  TitleContainer,
} from './styles';

export default Pushs = props => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getLoggedUser().then(user => setUserData(user));

    getNotificationSettings().then(settings => {
      if (settings.length < 1) {
        dispatch(ToastNotifyActions.toastNotifyShow('Erro ao buscar as configuração de notificações.', true));

        setTimeout(() => props.navigation.goBack(), 500);

        return;
      }

      setData(settings);
    }).finally(() => setLoading(false));
  }, []);

  useDebouncedEffect(() => {
    const updates = data.filter(item => item.update);

    const receive = updates.filter(item => item.recebeNotificacao);
    const notReceive = updates.filter(item => !item.recebeNotificacao);

    let itens = [];

    if (receive.length > 0) itens.push({
      ids: receive.map(item => item.idPushNotificacao),
      recebeNotificacao: true,
    });

    if (notReceive.length > 0) itens.push({
      ids: notReceive.map(item => item.idPushNotificacao),
      recebeNotificacao: false,
    });

    if (itens.length < 1) return;

    changeNotificationSettings({ itens })
      .then(() => { dispatch(ToastNotifyActions.toastNotifyShow('Notificações alteradas com sucesso!', false)) })
      .catch(() => { dispatch(ToastNotifyActions.toastNotifyShow('Erro ao alterar as notificações.', true)) });
  }, 1000, [data]);

  const handleNotificationClick = useCallback(type => {
    let item = data.find(item => item.idTipoNotificacao == type);

    item.recebeNotificacao = !item.recebeNotificacao;

    item.update = (item.update) ? !item.update : true;

    const notifications = data.filter(item => item.idTipoNotificacao != type);

    const newValues = [...notifications, item];

    setData(newValues);
  }, [data]);

  const getData = useCallback(type => {
    const item = data.find(item => item.idTipoNotificacao == type);

    return item?.recebeNotificacao || false;
  }, [data]);

  return (
    <Container>
      <Warp>
        <Header title={'Notificações Push'} back={() => props.navigation.goBack()} />
        {loading ? <Spinner /> :
          <List>
            <TitleContainer>
              <Title>{userData.nome || ''}</Title>
            </TitleContainer>
            <ListItem onPress={() => handleNotificationClick(-2)} underlayColor={colors.white} activeOpacity={1}>
              <ListContent>
                <ListText>Andamentos</ListText>
                <Switch
                  onValueChange={() => handleNotificationClick(-2)}
                  style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                  trackColor={{ false: colors.fadedBlack, true: "#689F38" }}
                  value={getData(-2)} />
              </ListContent>
            </ListItem>
            <ListItem onPress={() => handleNotificationClick(-1)} underlayColor={colors.white} activeOpacity={1}>
              <ListContent>
                <ListText>Publicações</ListText>
                <Switch
                  onValueChange={() => handleNotificationClick(-1)}
                  style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                  trackColor={{ false: colors.fadedBlack, true: "#689F38" }}
                  value={getData(-1)} />
              </ListContent>
            </ListItem>
          </List>
        }
      </Warp>
    </Container>
  );
}
