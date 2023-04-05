import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getLoggedUser, PermissionsGroups, checkPermission } from 'helpers/Permissions';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Container, Warp } from 'assets/styles/global';
import {
  List,
  ListItem,
  ListContent,
  ListText,
  Title
} from './styles';

import Blocked from 'pages/Blocked';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

export default Notifications = props => {

  	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;

  const [userData, setUserData] = useState({});
  const [permissionPublications, setPermissionPublications] = useState(false);
  const [permissionProcesses, setPermissionProcesses] = useState(false);
  const active = useSelector(state => state.auth.active);

  useEffect(() => {
    getLoggedUser().then(user => setUserData(user));

    checkPermission(PermissionsGroups.PROCESSES).then(hasPermission => setPermissionProcesses(hasPermission));
    checkPermission(PermissionsGroups.PUBLICATIONS).then(hasPermission => setPermissionPublications(hasPermission));
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
            {
              (permissionPublications || permissionProcesses) &&
              <ListItem onPress={() => props.navigation.navigate('Emails')}>
                <ListContent>
                  <MaterialIcons name="email" size={22} color={colors.fadedBlack} />
                  <ListText>Notificações de email</ListText>
                  <MaterialIcons name="chevron-right" size={24} color={colors.fadedBlack} />
                </ListContent>
              </ListItem>
            }
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
