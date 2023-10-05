import React from 'react';
import {View, FlatList} from 'react-native';
import {Container, ContainerItems, TextItems} from './styles';

const filters = [
	{id: 1, name: 'Este mês'},
	{id: 2, name: 'Hoje'},
	{id: 3, name: 'Esta semana'},
	{id: 4, name: 'Todo o período'},

];

const FilterScreen = () => {
	const renderFilter = ({item}) => {
		return (
			<Container>
				<ContainerItems>
						<TextItems>{item.name}</TextItems>
				</ContainerItems>
			</Container>
		);
	};

	return (
		<View>
			<FlatList
				data={filters}
				renderItem={renderFilter}
				keyExtractor={item => item.id.toString()}
				horizontal
				style={{
					overflow: 'hidden'
				}}/>
		</View>
	);
};

export default FilterScreen;
