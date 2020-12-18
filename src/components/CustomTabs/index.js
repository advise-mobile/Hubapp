import React from 'react';
import { Animated } from 'react-native';

import { Tabs, Tab, TabButton, TabText, UndelineTab } from './styles';

export default function DefaultTabBar(props) {
  const containerWidth = props.containerWidth - 72;
  const numberOfTabs = props.tabs.length;
  const tabSize = containerWidth / numberOfTabs;

  const translateX = props.scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabSize],
  });

  const renderTab = (name, page, isTabActive, onPressHandler) => (
    <TabButton
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}>
      <Tab>
        <TabText active={isTabActive}>
          {name}
        </TabText>
      </Tab>
    </TabButton>
  );

  return (
    <Tabs>
      {props.tabs.map((name, page) => renderTab(name, page, props.activeTab === page, props.goToPage))}
      <UndelineTab as={Animated.View} marginSize={tabSize - 50}
        style={{ transform: [{ translateX }] }}
      />
    </Tabs>
  );
};
