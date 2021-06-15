import React, { useState, useRef, useEffect, useCallback } from 'react';

import Header from 'components/Header';
import CustomScrollableTabBar from 'components/CustomScrollableTabBar';

import { Container, Warp } from 'assets/styles/general';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Infos from './Infos';
import Notifications from './Notifications';
import Help from './Help';

export default Account = props => {
  const scrollRef = useRef();

  const [selectedTab, setSelectedTab] = useState(0);

  const [customActions, setCustomActions] = useState();

  // useEffect(() => {
  //   props.navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();

  //     return;
  //   })
  // }, []);

  const renderTabs = useCallback(() =>
    <ScrollableTabView ref={scrollRef} initialPage={0} renderTabBar={() => <CustomScrollableTabBar />} onChangeTab={tab => setSelectedTab(tab.i)}>
      <Infos tabLabel='Informações' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 0} />
      <Notifications tabLabel='Notificações' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 1} />
      <Help tabLabel='Ajuda' setCustomActions={setCustomActions} navigation={props.navigation} selected={selectedTab == 2} />

    </ScrollableTabView >, [selectedTab]);

  return (
    <Container>
      <Warp>
        <Header title='Minha conta' customActions={customActions} />
        {renderTabs()}
      </Warp>
    </Container>
  );
}
