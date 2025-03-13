import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {ContainerItems, TextItems} from './styles';
import {useTheme} from 'styled-components';

const filters = [
	{id: 1, name: 'Este mês'},
	{id: 2, name: 'Hoje'},
	{id: 3, name: 'Esta semana'},
	{id: 4, name: 'Todos os períodos'},
];

const FilterScreen = ({onFilterSelect}) => {
	const [selectedFilter, setSelectedFilter] = useState(1);
	const colorUseTheme = useTheme();
	const {colors} = colorUseTheme;

	const renderFilter = React.useCallback(
		({item}) => {
			const isSelected = selectedFilter === item.id;

			return (
				<ContainerItems
					onPress={() => {
						if (!isSelected) {
							setSelectedFilter(item.id);
							onFilterSelect(item.id);
						}
					}}
					activeOpacity={0.7}
					style={{
						backgroundColor: isSelected ? colors.tabcolor : colors.realWhite,
					}}>
					<TextItems
						style={{
							color: isSelected ? colors.textTab : colors.BlackInactive,
						}}>
						{item.name}
					</TextItems>
				</ContainerItems>
			);
		},
		[selectedFilter, colors, onFilterSelect],
	);

	return (
		<View style={{paddingLeft: 18}}>
			<FlatList
				data={filters}
				renderItem={renderFilter}
				keyExtractor={item => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{
					marginTop: 10,
				}}
				removeClippedSubviews={true}
				initialNumToRender={4}
			/>
		</View>
	);
};

export default FilterScreen;
