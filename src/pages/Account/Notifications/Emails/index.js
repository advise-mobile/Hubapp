import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshControl, Animated, Switch, Platform } from 'react-native';

import Header from 'components/Header';
import Spinner from 'components/Spinner';

import Api from 'services/Api';
import { getLoggedUser, PermissionsGroups, checkPermission } from 'helpers/Permissions';

import useDebouncedEffect from 'use-debounced-effect';
// import CheckBox from '@react-native-community/checkbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { fonts, colors } from 'assets/styles';
import { Container, Warp } from 'assets/styles/general';
import {
  List,
  ListItem,
  ListContent,
  ListText,
  Title,
  TitleContainer,
  Options,
  Option,
  EmailsList,
  EmailContent,
  ActionButton
} from './styles';

import Add from './Modals/Add';
import Confirmation from './Modals/Confirmation';

export default Emails = props => {
  const addRef = useRef(null);
  const confirmationRef = useRef(null);

  const [userData, setUserData] = useState({});

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState([]);
  const [emails, setEmails] = useState([]);
  const [movementsAlert, setMovementsAlert] = useState(false);
  const [processesAlert, setProcessesAlert] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [permissionPublications, setPermissionPublications] = useState(false);
  const [permissionProcesses, setPermissionProcesses] = useState(false);

  const activeOptionsMovements = useRef(new Animated.Value(1)).current;
  const activeOptionsProcesses = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    getLoggedUser().then(user => setUserData(user));
    setLoading(true);

    getActionEvents();

    getEmailsUser();

    checkPermission(PermissionsGroups.PROCESSES).then(hasPermission => setPermissionProcesses(hasPermission));
    checkPermission(PermissionsGroups.PUBLICATIONS).then(hasPermission => setPermissionPublications(hasPermission));

  }, []);

  useDebouncedEffect(() => {
    if (loading) return;


    const items = checkDiff().map(rule => {
      const { ativo, idRegraAcaoEvento, idUsuarioCliente } = rule;

      return { ativo, idRegraAcaoEvento, idUsuarioCliente: idUsuarioCliente.toString(), idCliente: userData.idCliente };
    });

    if (items.length < 1) return;

    Api.put(`core/v1/acao-evento-usuario-cliente`, { itens: items });

  }, 1000, [data]);

  const getEmailsUser = useCallback(() => {
    setRefreshing(true);

    Api.get(`/core/v1/emails-usuario-cliente?campos=*&flAtivo=true`).then(({ data }) => {
      const { itens } = data;

      setEmails(itens);
    })
  }, []);

  const getActionEvents = useCallback(() => {
    setRefreshing(true);

    Api.get(`/core/v1/acoes-eventos-usuarios?campos=ativo,id,idUsuarioCliente,idRegraAcaoEvento,idProdutoAdviseXAcaoEvento,descricaoRegraAcaoEvento,nomeProdutoAdviseXAcaoEvento`)
      .then(response => {
        const itens = response.data.itens[0];

        itens.map(item => item.update = false);

        setData(itens.filter(item => item.nomeProdutoAdviseXAcaoEvento == 'HUB'));

        const ids = itens.length ? itens.filter(item => item.ativo).map(item => item.idRegraAcaoEvento) : null;

        if (ids && (ids.includes(-1) || ids.includes(-23))) {
          setMovementsAlert(true);
        } else {
          setMovementsAlert(false);

          Animated.timing(activeOptionsMovements, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }

        if (ids && (ids.includes(-3) || ids.includes(-31))) {
          setProcessesAlert(true);
        } else {
          setProcessesAlert(false);

          Animated.timing(activeOptionsProcesses, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }

      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  const getActionValue = useCallback(id => {
    const rule = data.find(action => action.idRegraAcaoEvento == id);

    return rule?.ativo || false;
  }, [data]);

  const toggleCheck = useCallback(id => {
    let newValues = data.map(action => {
      if (action.idRegraAcaoEvento != id) return action;

      action.update = true;
      action.ativo = !action.ativo;

      return action;
    });

    setData(newValues);
  }, [data]);


  const checkDiff = useCallback(() => data.filter(rule => rule.update), [data]);

  const handleNewPublications = () => {
    const active = !movementsAlert;

    setMovementsAlert(!movementsAlert);

    const value = activeOptionsMovements.__getValue() == 0 ? 1 : 0;

    Animated.timing(activeOptionsMovements, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();

    let newValues = [];

    if (!active) {
      newValues = data.map(action => {
        if (action.idRegraAcaoEvento == -1 || action.idRegraAcaoEvento == -23) {
          action.update = true;
          action.ativo = false;
        }

        return action;
      });
    } else {
      newValues = data.map(action => {
        if (action.idRegraAcaoEvento == -1) {
          action.update = true;
          action.ativo = true;
        }

        return action;
      });
    }

    setData(newValues);
  };

  const handleNewMovements = () => {
    const active = !processesAlert;

    setProcessesAlert(!processesAlert);

    const value = activeOptionsProcesses.__getValue() == 0 ? 1 : 0;

    Animated.timing(activeOptionsProcesses, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();

    let newValues = [];

    if (!active) {
      newValues = data.map(action => {
        if (action.idRegraAcaoEvento == -3 || action.idRegraAcaoEvento == -31) {
          action.update = true;
          action.ativo = false;
        }

        return action;
      });
    } else {
      newValues = data.map(action => {
        if (action.idRegraAcaoEvento == -3) {
          action.update = true;
          action.ativo = true;
        }

        return action;
      });
    }

    setData(newValues);
  };

  const handleNotificationMovements = useCallback((key, value) => {
    const newValues = data.map(action => {
      if (key === -1 || key === -23) {
        if (action.idRegraAcaoEvento == -1 || action.idRegraAcaoEvento == -23) {
          action.update = true;
          action.ativo = !action.ativo;
        }
      } else {
        if (action.idRegraAcaoEvento == -3 || action.idRegraAcaoEvento == -31) {
          action.update = true;
          action.ativo = !action.ativo;
        }
      }

      return action;
    });

    setData(newValues);
  }, [data]);

  const handleConfirmation = useCallback(email => {
    setCurrentEmail(email);

    confirmationRef.current?.open();
  });

  const renderConfirmation = useCallback(() => <Confirmation ref={confirmationRef} onRemoveEmail={id => onRemoveEmail(id)} email={currentEmail} />, [currentEmail]);

  const onRecordEmail = useCallback(email => setEmails([email, ...emails]), [emails]);

  const onRemoveEmail = useCallback(id => {

    const newEmails = emails.filter(email => email.id !== id);

    setEmails(newEmails);
  }, [emails]);

  return (
    <Container>
      <Warp>
        <Header title={'Notificações de email'} back={() => props.navigation.goBack()} add={() => addRef.current?.open()} lower={true} />
        {loading ? <Spinner /> :
          <List
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => { getActionEvents(); getEmailsUser(); }}
              />
            }
          >
            <TitleContainer>
              <Title>{userData.nome || ''}</Title>
            </TitleContainer>
            <TitleContainer>
              <Title>Movimentações</Title>
            </TitleContainer>
            {
              permissionPublications &&
              <>
                <ListItem>
                  <ListContent>
                    <ListText>Notificar por email quando não houver novas publicações</ListText>
                    <Switch
                      onValueChange={() => toggleCheck(-24)}
                      style={{ transform: [{ scale: Platform.OS == 'ios' ? .7 : 1 }] }}
                      trackColor={{ false: colors.fadedBlack, true: "#689F38" }}
                      value={getActionValue(-24)} />
                  </ListContent>
                </ListItem>
                <ListItem>
                  <ListContent>
                    <ListText>Notificar por email quando houver novas publicações</ListText>
                    <Switch
                      onValueChange={() => handleNewPublications()}
                      style={{ transform: [{ scale: Platform.OS == 'ios' ? .7 : 1 }] }}
                      trackColor={{ false: colors.fadedBlack, true: "#689F38" }}
                      value={movementsAlert} />
                  </ListContent>
                  <ListContent as={Animated.View} style={{
                    overflow: 'hidden',
                    flex: 1,
                    maxHeight: activeOptionsMovements.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 500],
                    })
                  }}>
                    <Options style={{ height: 90 }}>
                      <RadioForm animation={true} style={{ flex: 1 }}>
                        <Option as={RadioButton}>
                          <RadioButtonInput
                            obj={{ label: 'Enviar novas publicações na íntegra', value: getActionValue(-23) }}
                            isSelected={getActionValue(-23)}
                            onPress={value => handleNotificationMovements(-23, value)}
                            borderWidth={1}
                            buttonInnerColor={colors.primary}
                            buttonOuterColor={colors.primary}
                            buttonSize={12}
                            buttonOuterSize={18}
                          />
                          <RadioButtonLabel
                            obj={{ label: 'Enviar novas publicações na íntegra', value: getActionValue(-23) }}
                            labelWrapStyle={{
                              'flex': 2,
                            }}
                            labelStyle={{
                              'color': colors.grayDarker,
                              'fontFamily': fonts.circularStdBook,
                              'fontSize': fonts.small,
                              'paddingRight': 22,
                            }}
                            onPress={value => handleNotificationMovements(-23, value)}
                          />
                        </Option>
                        <Option as={RadioButton}>
                          <RadioButtonInput
                            obj={{ label: 'Enviar apenas o aviso de novas publicações', value: getActionValue(-1) }}
                            isSelected={getActionValue(-1)}
                            onPress={value => handleNotificationMovements(-1, value)}
                            borderWidth={1}
                            buttonInnerColor={colors.primary}
                            buttonOuterColor={colors.primary}
                            buttonSize={12}
                            buttonOuterSize={18}
                          />
                          <RadioButtonLabel
                            numberOfLines={1}
                            obj={{ label: 'Enviar apenas o aviso de novas publicações', value: getActionValue(-1) }}
                            labelWrapStyle={{
                              'flex': 2,
                            }}
                            labelStyle={{
                              'color': colors.grayDarker,
                              'fontFamily': fonts.circularStdBook,
                              'fontSize': fonts.small,
                              'paddingLeft': 0,
                              'paddingRight': 22,
                            }}
                            onPress={value => handleNotificationMovements(-1, value)}
                          />
                        </Option>
                        {/* {radioProps.map(obj => {
                          console.log(obj);
                          return (
                            <Option as={RadioButton}>
                              <RadioButtonInput
                                obj={obj}
                                isSelected={obj.value}
                                onPress={() => {
                                  toggleCheck(-23)
                                }}
                                borderWidth={1}
                                buttonInnerColor={colors.primary}
                                buttonOuterColor={colors.primary}
                                buttonSize={12}
                                buttonOuterSize={18}
                              />
                              <RadioButtonLabel
                                obj={obj}
                                labelStyle={{
                                  'color': colors.grayDarker,
                                  'fontFamily': fonts.circularStdBook,
                                  'fontSize': fonts.small,
                                  'paddingRight': 22,
                                }}
                                onPress={() => {
                                  toggleCheck(-1)
                                }}
                              />
                            </Option>
                          );
                        })} */}
                      </RadioForm>
                    </Options>
                  </ListContent>
                </ListItem>
              </>
            }
            {
              permissionProcesses &&
              <ListItem>
                <ListContent>
                  <ListText>Notificar por email quando houver novos andamentos</ListText>
                  <Switch
                    onValueChange={() => handleNewMovements()}
                    style={{ transform: [{ scale: Platform.OS == 'ios' ? .7 : 1 }] }}
                    trackColor={{ false: colors.fadedBlack, true: "#689F38" }}
                    value={processesAlert} />
                </ListContent>
                <ListContent as={Animated.View} style={{
                  overflow: 'hidden',
                  flex: 1,
                  maxHeight: activeOptionsProcesses.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 500],
                  })
                }}>
                  <Options style={{ height: 105 }}>
                    <RadioForm animation={true} style={{ flex: 1 }}>
                      <Option as={RadioButton}>
                        <RadioButtonInput
                          obj={{ label: 'Enviar os processos que receberam novos andamentos', value: getActionValue(-31) }}
                          isSelected={getActionValue(-31)}
                          onPress={value => handleNotificationMovements(-31, value)}
                          borderWidth={1}
                          buttonInnerColor={colors.primary}
                          buttonOuterColor={colors.primary}
                          buttonSize={12}
                          buttonOuterSize={18}
                        />
                        <RadioButtonLabel
                          obj={{ label: 'Enviar os processos que receberam novos andamentos', value: getActionValue(-31) }}
                          labelWrapStyle={{
                            'flex': 2,
                          }}
                          labelStyle={{
                            'color': colors.grayDarker,
                            'fontFamily': fonts.circularStdBook,
                            'fontSize': fonts.small,
                            'paddingRight': 22,
                          }}
                          onPress={value => handleNotificationMovements(-31, value)}
                        />
                      </Option>
                      <Option as={RadioButton}>
                        <RadioButtonInput
                          obj={{ label: 'Enviar apenas o aviso de novos andamentos', value: getActionValue(-3) }}
                          isSelected={getActionValue(-3)}
                          onPress={value => handleNotificationMovements(-3, value)}
                          borderWidth={1}
                          buttonInnerColor={colors.primary}
                          buttonOuterColor={colors.primary}
                          buttonSize={12}
                          buttonOuterSize={18}
                        />
                        <RadioButtonLabel
                          numberOfLines={1}
                          obj={{ label: 'Enviar apenas o aviso de novos andamentos', value: getActionValue(-3) }}
                          labelWrapStyle={{
                            'flex': 2,
                          }}
                          labelStyle={{
                            'color': colors.grayDarker,
                            'fontFamily': fonts.circularStdBook,
                            'fontSize': fonts.small,
                            'paddingLeft': 0,
                            'paddingRight': 22,
                          }}
                          onPress={value => handleNotificationMovements(-3, value)}
                        />
                      </Option>
                    </RadioForm>
                  </Options>
                </ListContent>
              </ListItem>
            }
            {
              (permissionProcesses || permissionPublications) &&
              <ListItem>
                <ListContent>
                  <Title>Também encaminhar para o(s) email(s) abaixo:</Title>
                </ListContent>

                <EmailsList>
                  {emails.map((email, key) =>
                    <EmailContent key={key}>
                      <ListText>{email.email}</ListText>
                      <ActionButton onPress={() => handleConfirmation(email)}>
                        <MaterialIcons size={22} name="delete" color={colors.fadedBlack} />
                      </ActionButton>
                    </EmailContent>
                  )}
                </EmailsList>
              </ListItem>
            }
          </List>
        }
        <Add ref={addRef} onRecordEmail={email => onRecordEmail(email)} />
        {renderConfirmation()}
      </Warp>
    </Container>
  );
}
