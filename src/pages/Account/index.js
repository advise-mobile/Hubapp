import React, {useState, useRef, useEffect, useCallback} from 'react';

import Header from 'components/Header';
import CustomScrollableTabBar from 'components/CustomScrollableTabBar';

import {Container, Warp} from 'assets/styles/global';

import ScrollableTabView from 'components/ScrollableTabView';

import Infos from './Infos';
import Notifications from './Notifications';
import Payments from './Payments';
import Help from './Help';

// Add Hook UseTheme para pegar o tema global addicionado
import {useTheme} from 'styled-components';

export default Account = props => {
	const scrollRef = useRef();

	const [selectedTab, setSelectedTab] = useState(0);

	const [customActions, setCustomActions] = useState();

	// Variavel para usar o hook
	const colorUseTheme = useTheme();

	// useEffect(() => {
	//   props.navigation.addListener('beforeRemove', (e) => {
	//     e.preventDefault();

	//     return;
	//   })
	// }, []);

	const renderTabs = useCallback(
		() => (
			<ScrollableTabView
				ref={scrollRef}
				initialPage={0}
				renderTabBar={() => <CustomScrollableTabBar theme={colorUseTheme} />}
				onChangeTab={tab => setSelectedTab(tab.i)}>
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
		),
		[selectedTab],
	);

	return (
		<Container>
			<Warp>
				<Header title="Minha conta" customActions={customActions} />
				{renderTabs()}
			</Warp>
		</Container>
	);
};
