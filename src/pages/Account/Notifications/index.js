import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getLoggedUser } from 'helpers/Permissions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from 'assets/styles';
import { Container, Warp } from 'assets/styles/general';
import {
  List,
  ListItem,
  ListContent,
  ListText,
  Title
} from './styles';

import Blocked from 'pages/Blocked';

export default Notifications = props => {
  const [userData, setUserData] = useState({});
  const active = useSelector(state => state.auth.active);

  useEffect(() => {
    getLoggedUser().then(user => setUserData(user));
  }, []);

  useEffect(() => {
    if (!props.selected) return;

    props.setCustomActions(null);
  }, [props.selected]);

  return (
    <Container>
      {active ?
        <Warp>
          <List>
            <Title>{userData.nome || ''}</Title>
            <ListItem onPress={() => props.navigation.navigate('Emails')}>
              <ListContent>
                <MaterialIcons name="email" size={22} color={colors.fadedBlack} />
                <ListText>Notificações de email</ListText>
                <MaterialIcons name="chevron-right" size={24} color={colors.fadedBlack} />
              </ListContent>
            </ListItem>
            <ListItem onPress={() => props.navigation.navigate('Pushs')}>
              <ListContent>
                <MaterialIcons name="notifications" size={22} color={colors.fadedBlack} />
                <ListText>Notificações push</ListText>
                <MaterialIcons name="chevron-right" size={24} color={colors.fadedBlack} />
              </ListContent>
            </ListItem>
          </List>
        </Warp>
        :
        <Blocked />
      }
    </Container>
  );
}
