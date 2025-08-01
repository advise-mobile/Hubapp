import React from 'react';
// const React = require('react');
import {
	ViewPropTypes,
	Animated,
	StyleSheet,
	ScrollView,
	Text,
	Platform,
	Dimensions,
} from 'react-native';
const PropTypes = require('prop-types');

const createReactClass = require('create-react-class');

import {TabsContainer, Tabs, Tab, TabButton, TabText, UndelineTab} from './styles';

const WINDOW_WIDTH = Dimensions.get('window').width;

const CustomScrollableTabBar = createReactClass({
	propTypes: {
		goToPage: PropTypes.func,
		activeTab: PropTypes.number,
		tabs: PropTypes.array,
		backgroundColor: PropTypes.string,
		activeTextColor: PropTypes.string,
		inactiveTextColor: PropTypes.string,
		activeTextFontSize: PropTypes.number,
		inactiveTextFontSize: PropTypes.number,
		scrollOffset: PropTypes.number,
		style: ViewPropTypes.style,
		tabStyle: ViewPropTypes.style,
		tabsContainerStyle: ViewPropTypes.style,
		textStyle: Text.propTypes.style,
		renderTab: PropTypes.func,
		underlineStyle: ViewPropTypes.style,
		onScroll: PropTypes.func,
	},

	getDefaultProps() {
		return {
			scrollOffset: 52,
			activeTextColor: 'navy',
			inactiveTextColor: 'black',
			activeTextFontSize: 16,
			inactiveTextFontSize: 16,
			backgroundColor: null,
			style: {},
			tabStyle: {},
			tabsContainerStyle: {},
			underlineStyle: {},
		};
	},

	getInitialState() {
		this._tabsMeasurements = [];
		return {
			_leftTabUnderline: new Animated.Value(0),
			_widthTabUnderline: new Animated.Value(0),
			_containerWidth: null,
		};
	},

	componentDidMount() {
		if (this.props.scrollValue) {
			this.props.scrollValue.addListener(this.updateView);
		}
	},

	componentWillUnmount() {
		if (this.props.scrollValue) {
			this.props.scrollValue.removeListener(this.updateView);
		}
	},

	updateView(offset) {
		if (!offset || !offset.value) return;

		const position = Math.floor(offset.value);
		const pageOffset = offset.value % 1;
		const tabCount = this.props.tabs.length;
		const lastTabPosition = tabCount - 1;

		if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
			return;
		}

		if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
			this.updateTabPanel(position, pageOffset);
			this.updateTabUnderline(position, pageOffset, tabCount);
		}
	},

	necessarilyMeasurementsCompleted(position, isLastTab) {
		return (
			this._tabsMeasurements[position] &&
			(isLastTab || this._tabsMeasurements[position + 1]) &&
			this._tabContainerMeasurements &&
			this._containerMeasurements
		);
	},

	updateTabPanel(position, pageOffset) {
		const containerWidth = this._containerMeasurements.width;
		const tabWidth = this._tabsMeasurements[position].width;
		const nextTabMeasurements = this._tabsMeasurements[position + 1];
		const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0;
		const tabOffset = this._tabsMeasurements[position].left;
		const absolutePageOffset = pageOffset * tabWidth;
		let newScrollX = tabOffset + absolutePageOffset;

		// center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
		newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
		newScrollX = newScrollX >= 0 ? newScrollX : 0;

		if (Platform.OS === 'android') {
			this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false});
		} else {
			const rightBoundScroll =
				this._tabContainerMeasurements.width - this._containerMeasurements.width;
			newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
			this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false});
		}
	},

	updateTabUnderline(position, pageOffset, tabCount) {
		let lineLeft = this._tabsMeasurements[position].left;
		const lineRight = this._tabsMeasurements[position].right;

		if (position < tabCount - 1) {
			const nextTabLeft = this._tabsMeasurements[position + 1].left;
			const nextTabRight = this._tabsMeasurements[position + 1].right;

			let newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
			const newLineRight = pageOffset * nextTabRight + (1 - pageOffset) * lineRight;
			newLineLeft = newLineLeft + (newLineRight - newLineLeft - 40) / 2;
			this.state._leftTabUnderline.setValue(newLineLeft);
			this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
		} else {
			lineLeft = (lineRight - lineLeft - 40) / 2 + lineLeft;
			this.state._leftTabUnderline.setValue(lineLeft);
			this.state._widthTabUnderline.setValue(lineRight - lineLeft);
		}
	},

	renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
		// const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
		// const textColor = isTabActive ? activeTextColor : inactiveTextColor;
		// const textFontSize = isTabActive ? fonts.big + 2 : fonts.regular;
		// const fontWeight = isTabActive ? 'bold' : 'normal';

		const {theme} = this.props;
		const styles = stylesCustomScrollableTabBar(theme.colors);

		return (
			<TabButton
				key={`${name}_${page}`}
				accessible={true}
				accessibilityLabel={name}
				accessibilityTraits="button"
				onPress={() => onPressHandler(page)}
				onLayout={onLayoutHandler}>
				<Tab style={[styles.tab]}>
					<TabText active={isTabActive}>{name}</TabText>
				</Tab>
			</TabButton>
		);
	},

	measureTab(page, event) {
		const {x, width, height} = event.nativeEvent.layout;
		this._tabsMeasurements[page] = {left: x, right: x + width, width, height};
		this.updateView({value: this.props.scrollValue.__getValue()});
	},

	render() {
		// Get it from props
		const {theme} = this.props;
		const styles = stylesCustomScrollableTabBar(theme.colors);

		const dynamicTabUnderline = {
			left: this.state._leftTabUnderline,
			width: this.state._widthTabUnderline,
		};

		return (
			<TabsContainer
				style={[styles.container, {backgroundColor: this.props.backgroundColor}, this.props.style]}
				onLayout={this.onContainerLayout}>
				<ScrollView
					ref={scrollView => {
						this._scrollView = scrollView;
					}}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					directionalLockEnabled={true}
					bounces={false}
					scrollsToTop={false}>
					<Tabs
						style={{width: this.state._containerWidth}}
						ref={'tabContainer'}
						onLayout={this.onTabContainerLayout}>
						{this.props.tabs &&
							this.props.tabs.map((name, page) =>
								this.renderTab(
									name,
									page,
									this.props.activeTab === page,
									this.props.goToPage,
									this.measureTab.bind(this, page),
								),
							)}
						<UndelineTab as={Animated.View} style={[dynamicTabUnderline]} />
					</Tabs>
				</ScrollView>
			</TabsContainer>
		);
	},

	componentDidUpdate(prevProps) {
		// If the tabs change, force the width of the tabs container to be recalculated
		if (
			JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) &&
			this.state._containerWidth
		) {
			this.setState({_containerWidth: null});
		}
	},

	onTabContainerLayout(e) {
		this._tabContainerMeasurements = e.nativeEvent.layout;
		let width = this._tabContainerMeasurements.width;
		if (width < WINDOW_WIDTH) {
			width = WINDOW_WIDTH;
		}
		this.setState({_containerWidth: width});
		this.updateView({value: this.props.scrollValue.__getValue()});
	},

	onContainerLayout(e) {
		this._containerMeasurements = e.nativeEvent.layout;
		this.updateView({value: this.props.scrollValue.__getValue()});
	},
});

module.exports = CustomScrollableTabBar;

const stylesCustomScrollableTabBar = colors =>
	StyleSheet.create({
		tab: {
			height: 49,
			alignItems: 'center',
			justifyContent: 'center',
			paddingLeft: 20,
			paddingRight: 20,
		},
		container: {
			marginTop: 10,
			height: 50,
			borderBottomWidth: 1,
			borderColor: colors.inactive,
		},
		tabs: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
	});
