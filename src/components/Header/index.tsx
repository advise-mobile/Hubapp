import React from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import {
  HeaderContainer,
  HeaderActionsLeft,
  HeaderActionsRight,
  HeaderAction,
  HeaderActionPlaceholder,
  HeaderTitle,
} from './styles';
import type { HeaderProps } from './types';

export type { HeaderActionConfig, HeaderProps } from './types';

export function Header({
  title,
  lower = false,
  leftActions = [],
  rightActions = [],
}: HeaderProps) {
  const theme = useTheme();
  const iconColor = theme.colors?.fadedBlack ?? theme.colors?.primary ?? '#333';

  return (
    <HeaderContainer>
      <HeaderActionsLeft>
        {leftActions.length > 0 ? (
          leftActions.map((action, index) => (
            <HeaderAction
              key={`left-${index}`}
              onPress={action.disabled ? undefined : action.onPress}
              disabled={action.disabled}
              activeOpacity={action.disabled ? 1 : 0.7}
            >
              <MaterialIcons
                name={action.icon as any}
                size={20}
                color={action.colorIcon ?? iconColor}
              />
            </HeaderAction>
          ))
        ) : (
          <HeaderActionPlaceholder disabled>
            <MaterialIcons name="filter-list" size={20} color={iconColor} />
          </HeaderActionPlaceholder>
        )}
      </HeaderActionsLeft>
      <HeaderTitle lower={lower}>{title}</HeaderTitle>
      <HeaderActionsRight>
        {rightActions.length > 0 ? (
          rightActions.map((action, index) => (
            <HeaderAction
              key={`right-${index}`}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              {action.iconBackgroundColor != null ? (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: action.iconBackgroundColor,
                  }}
                >
                  <MaterialIcons
                    name={action.icon as any}
                    size={14}
                    color={action.colorIcon ?? iconColor}
                  />
                </View>
              ) : (
                <MaterialIcons
                  name={action.icon as any}
                  size={20}
                  color={action.colorIcon ?? iconColor}
                />
              )}
            </HeaderAction>
          ))
        ) : (
          <HeaderActionPlaceholder disabled>
            <MaterialIcons name="add-circle" size={20} color={iconColor} />
          </HeaderActionPlaceholder>
        )}
      </HeaderActionsRight>
    </HeaderContainer>
  );
}
