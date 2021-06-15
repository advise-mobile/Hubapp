import React from 'react';
import { Platform } from 'react-native';
import { colors } from 'assets/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  HeaderContainer,
  HeaderActionsLeft,
  HeaderActionsRight,
  HeaderAction,
  HeaderTitle,
  Blank,
} from 'assets/styles/general';

const Header = props => (
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
          <MaterialIcons name="add-circle" size={20} color={colors.fadedBlack} onPress={() => props.add()} />
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

export default Header;
