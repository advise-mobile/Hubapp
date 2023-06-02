import React from 'react';
import { Platform,Text, View } from 'react-native';

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
  HeaderButtonText,
} from 'assets/styles/global';

// Menu para Lixeira
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default Header = props => {

  
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
                  <MaterialIcons name="add-circle" size={20} color={colors.fadedBlack} onPress={() => props.add()} />
                </HeaderAction>
              )}
              {props.edit && (
                <HeaderAction>
                  <MaterialIcons name="settings" size={20} color={colors.fadedBlack} onPress={() => props.edit()} />
                </HeaderAction>
              )}

              {props.menu && (
                    
                      <Menu>
                        <MenuTrigger >    
                          <MaterialIcons name="more-vert" size={20} color={colors.fadedBlack} />    
                        </MenuTrigger>
                        <MenuOptions 
                          customStyles={{
                            optionsContainer: {
                              borderRadius: 5,
                              padding:10,
                              width:143,
                              marginTop:30
                            },
                          }}>
                            <MenuOption  
                              customStyles={{
                                  optionWrapper: {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                }}
                               onSelect={() => props.menu()}>
                              <View style={{flexDirection: "row", width:70, justifyContent: "space-between"}}>
                                <MaterialIcons name="delete" size={20} color={colors.primary} />   
                                <Text>Lixeira</Text>
                              </View>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
              )}

              {props.customActions && props.customActions}
            </HeaderActionsRight>
          </HeaderContainer>
     	);
    };
