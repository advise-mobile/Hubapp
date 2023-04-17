import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  IconContainer,
  AddIcon
} from './styles';

import { PermissionsGroups, checkPermission } from 'helpers/Permissions';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

const CustomIcon = props => {

   	// Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;
  
  const active = useSelector(state => state.auth.active);
  const [permission, setPermission] = useState(true);

  useEffect(() => {

    if (props.group)
      checkPermission(props.group).then(hasPermission => setPermission(hasPermission));
  }, []);

  return (
    <IconContainer>
      {props.children}

      {(!active || !permission) &&
        <AddIcon>
          <MaterialIcons name="add-circle" size={14} color={colors.fadedBlack} />
        </AddIcon>
      }
    </IconContainer>
  );
};

export default CustomIcon;
