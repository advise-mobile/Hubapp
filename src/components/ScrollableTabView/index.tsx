import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const ScrollableTabView = ({
	children,
	renderTabBar,
	onChangeTab,
	initialPage = 0,
	style,
	tabBarPosition = 'top',
	...props
}) => {
	// Converte os children em um array de objetos para o Tab.Navigator
	const screens = React.Children.map(children, (child, index) => {
		if (!child) return null;

		return {
			name: `tab${index}`,
			component: () => child,
			options: {
				tabBarLabel: child.props.tabLabel,
			},
		};
	});

	// Componente que renderiza o conteúdo da tab
	const TabScreen = ({route, navigation}) => {
		const index = screens.findIndex(screen => screen.name === route.name);
		const child = children[index];

		React.useEffect(() => {
			if (onChangeTab) {
				onChangeTab({i: index, ref: child});
			}
		}, [index]);

		return child;
	};

	return (
		<View style={[{flex: 1}, style]}>
			<Tab.Navigator
				initialRouteName={`tab${initialPage}`}
				tabBar={renderTabBar}
				screenOptions={{
					tabBarPosition,
					...props,
				}}>
				{screens.map(screen => (
					<Tab.Screen
						key={screen.name}
						name={screen.name}
						component={TabScreen}
						options={screen.options}
					/>
				))}
			</Tab.Navigator>
		</View>
	);
};

export default ScrollableTabView;
