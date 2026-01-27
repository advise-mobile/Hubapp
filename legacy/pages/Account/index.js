import React, { useState } from 'react';

import Header from '@lcomponents/Header';
import CustomTabs from '@lcomponents/CustomTabs';
import { Container, Warp } from '@lassets/styles/global';
import ScrollableTabView from '@components/ScrollableTabView';

import Infos from './Infos';
import Notifications from './Notifications';
import Payments from './Payments';
import Help from './Help';

const Account = props => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [customActions, setCustomActions] = useState();

  return (
    <Container>
      <Warp>
        <Header title="Minha conta" customActions={customActions} />
        <ScrollableTabView
          renderTabBar={props => (
            <CustomTabs
              {...props}
              tabs={[
                'Informações',
                'Notificações',
                'Central de Pagamentos',
                'Ajuda',
              ]}
            />
          )}
          initialPage={0}
          onChangeTab={({ i }) => {
            setSelectedTab(i);
          }}
        >
          <Infos
            tabLabel="Informações"
            setCustomActions={setCustomActions}
            navigation={props.navigation}
            selected={selectedTab == 0}
          />
          <Notifications
            tabLabel="Notificações"
            setCustomActions={setCustomActions}
            navigation={props.navigation}
            selected={selectedTab == 1}
          />
          <Payments
            tabLabel="Central de Pagamentos"
            setCustomActions={setCustomActions}
            navigation={props.navigation}
            selected={selectedTab == 2}
          />
          <Help
            tabLabel="Ajuda"
            setCustomActions={setCustomActions}
            navigation={props.navigation}
            selected={selectedTab == 3}
          />
        </ScrollableTabView>
      </Warp>
    </Container>
  );
};

export default Account;
