import React, {useState, useRef} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';

const ScrollableTabView = ({
	children,
	renderTabBar,
	onChangeTab,
	initialPage = 0,
	style,
	...props
}) => {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const scrollViewRef = useRef(null);
	const windowWidth = Dimensions.get('window').width;

	const handleScroll = event => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const page = Math.round(offsetX / windowWidth);

		if (page !== currentPage) {
			setCurrentPage(page);
			if (onChangeTab) {
				onChangeTab({i: page, ref: children[page]});
			}
		}
	};

	const handleTabPress = index => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				x: index * windowWidth,
				animated: true,
			});
		}
	};

	return (
		<View style={[{flex: 1}, style]}>
			{renderTabBar &&
				renderTabBar({
					activeTab: currentPage,
					goToPage: handleTabPress,
					tabs: React.Children.map(children, child => child.props.tabLabel),
					scrollValue: {interpolate: () => currentPage},
				})}

			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				{...props}>
				{React.Children.map(children, (child, index) => (
					<View style={{width: windowWidth}}>{child}</View>
				))}
			</ScrollView>
		</View>
	);
};

export default ScrollableTabView;
