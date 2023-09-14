import React from 'react';
import { Platform } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';

import {
  HeaderContainer,
  HeaderActionsLeft,
  HeaderActionsRight,
  HeaderAction,
  HeaderTitle,
  Blank,
} from 'assets/styles/global';

export default HeaderGlobals = props => {
  // Variavel para usar o hook
  const colorUseTheme = useTheme();
  const { colors } = colorUseTheme;
  return (
          <HeaderContainer style={{ minHeight: 0, paddingTop: Platform.OS == 'ios' ? 0 : 8 }}>
            <HeaderActionsLeft>
              {props.filter && (
                <HeaderAction>
                  <MaterialIcons name="filter-list" size={20} color={colors.fadedBlack} onPress={() => props.filter()} />
                </HeaderAction>
              )}
              {props.back && (
                <HeaderAction>
                  <MaterialIcons name="arrow-back" size={20} color={colors.fadedBlack} onPress={() => props.back()} />
                </HeaderAction>
              )}
              {!props.filter && !props.back && <Blank />}
            </HeaderActionsLeft>
            <HeaderTitle lower={props.lower || false}>{props.title}</HeaderTitle>
            <HeaderActionsRight>
              {props.add && (
                <HeaderAction>
                  <MaterialIcons name="add-circle" size={20} color={colors.green200} onPress={() => props.add()} />
                </HeaderAction>
              )}
							{props.more && (
                <HeaderAction>
                  <MaterialIcons name="more-horiz" size={25} color={colors.fadedBlack} onPress={() => props.edit()} />
                </HeaderAction>
              )}
              {props.edit && (
                <HeaderAction>
                  <MaterialIcons name="settings" size={20} color={colors.fadedBlack} onPress={() => props.edit()} />
                </HeaderAction>
              )}

              {props.customActions && props.customActions}
            </HeaderActionsRight>
          </HeaderContainer>
     	);
    };
