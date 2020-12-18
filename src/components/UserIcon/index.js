import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import { Icon, IconText, IconImage } from './styles';


const UserIcon = props => {
  const [initials, setInitials] = useState();

  useEffect(() => {
    if (!props.avatar) {
      if (props.name) {
        let splittedName = props.name.split(" ");
        let initials = splittedName.length == 1 ? splittedName[0][0] : `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`;

        setInitials(initials);
      } else {
        AsyncStorage.getItem('@AdviseStart:token').then(token => {
          const userInfos = jwtDecode(token);

          let splittedName = userInfos.nome.split(" ");
          let initials = splittedName.length == 1 ? splittedName[0][0] : `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`;

          setInitials(initials);
        });
      }
    }
  }, [props]);

  return (
    <Icon {...props} active={props.avatar ? true : false}>
      {props.avatar ? (
        <IconImage source={{ uri: `data:image/png;charset=utf-8;base64,${props.avatar}` }} size={props.size || false} />
      ) : (
          <IconText>{initials}</IconText>
        )}
    </Icon>
  )
};

export default UserIcon;
