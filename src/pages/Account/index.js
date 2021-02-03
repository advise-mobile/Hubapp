import React, { useState, useRef, useEffect } from 'react';
import {
  Text
} from 'react-native';

import Header from 'components/Header';
import CustomScrollableTabBar from 'components/CustomScrollableTabBar';

import { Container, Warp } from 'assets/styles/general';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Infos from './Infos';

export default Account = props => {
  const scrollRef = useRef();

  const [customActions, setCustomActions] = useState();

  return (
    <Container>
      <Warp>
        <Header title='Minha conta' customActions={customActions} />

        <ScrollableTabView ref={scrollRef} initialPage={0} renderTabBar={() => <CustomScrollableTabBar />}>
          <Infos tabLabel='Informações' setCustomActions={setCustomActions} navigation={props.navigation} />
          {/* <Text tabLabel='Notificações'>Notificações</Text>
          <Text tabLabel='Integrações'>Integrações</Text>
          <Text tabLabel='Central de pagamentos'>Central de pagamentos</Text>
          <Text tabLabel='Meus Recursos'>Meus Recursos</Text> */}
        </ScrollableTabView >
      </Warp>
    </Container>
  );
}
