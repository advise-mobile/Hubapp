import React, { useState } from 'react';
import { ScrollView, Dimensions, View } from 'react-native';
import { Tabs, Tab, TabButton, TabText, UndelineTab } from './styles';

const CustomTabs = ({ activeTab, goToPage, tabs, scrollValue }) => {
  const [textWidths, setTextWidths] = useState({});
  const [containerWidth, setContainerWidth] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  const handleTextLayout = (page, event) => {
    const { width } = event.nativeEvent.layout;
    setTextWidths(prev => ({
      ...prev,
      [page]: width,
    }));
  };

  const handleContainerLayout = event => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  // Calcula se deve centralizar baseado na largura real
  const minTabWidth = 120;
  const padding = 36;
  const estimatedTotalWidth = tabs.length * (minTabWidth + padding);
  const shouldCenter = estimatedTotalWidth < windowWidth;

  return (
    <Tabs onLayout={handleContainerLayout}>
      {shouldCenter ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 18,
          }}
        >
          {tabs.map((name, page) => {
            const textWidth = textWidths[page] || 0;
            const isActive = activeTab === page;
            const underlineWidth =
              textWidth > 0
                ? isActive
                  ? textWidth * 0.4
                  : textWidth * 0.2
                : isActive
                ? 50
                : 25;

            return (
              <Tab key={name}>
                <TabButton onPress={() => goToPage(page)}>
                  <TabText
                    active={isActive}
                    onLayout={event => handleTextLayout(page, event)}
                  >
                    {name}
                  </TabText>
                  <UndelineTab width={underlineWidth} active={isActive} />
                </TabButton>
              </Tab>
            );
          })}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18,
          }}
        >
          {tabs.map((name, page) => {
            const textWidth = textWidths[page] || 0;
            const isActive = activeTab === page;
            const underlineWidth =
              textWidth > 0
                ? isActive
                  ? textWidth * 0.4
                  : textWidth * 0.2
                : isActive
                ? 50
                : 25;

            return (
              <Tab key={name}>
                <TabButton onPress={() => goToPage(page)}>
                  <TabText
                    active={isActive}
                    onLayout={event => handleTextLayout(page, event)}
                  >
                    {name}
                  </TabText>
                  <UndelineTab width={underlineWidth} active={isActive} />
                </TabButton>
              </Tab>
            );
          })}
        </ScrollView>
      )}
    </Tabs>
  );
};

export default CustomTabs;
