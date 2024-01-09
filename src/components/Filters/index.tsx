import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Container, ContainerItems, TextItems} from './styles';
import {useTheme} from 'styled-components';

const filters = [
	{id: 1, name: 'Este mês'},
	{id: 2, name: 'Hoje'},
	{id: 3, name: 'Esta semana'},
	{id: 4, name: 'Todo os períodos'},
];

const Filter = () => {
	const [selectedFilter, setSelectedFilter] = useState(null);

	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const renderFilter = ({item}) => {
		const isSelected = item.id === selectedFilter;

		return (
			<Container>
				<ContainerItems style={{backgroundColor: isSelected ? colors.backgroundButton : 'white'}}>
					<TouchableOpacity style={{padding: 10}} onPress={() => setSelectedFilter(item.id)}>
						<TextItems style={{color: isSelected ? 'white' : colors.backgroundButton}}>
							{item.name}
						</TextItems>
					</TouchableOpacity>
				</ContainerItems>
			</Container>
		);
	};

	return (
		<View style={{flex: 1}}>
			<FlatList
				data={filters}
				renderItem={renderFilter}
				keyExtractor={item => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Filter;
