import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, Animated } from 'react-native';

const ScrollableTabView = ({
  children,
  renderTabBar,
  onChangeTab,
  initialPage = 0,
  style,
  scrollValue,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const scrollViewRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;

  // Usa o scrollValue passado como prop ou cria um novo
  const scrollValueRef = useRef(scrollValue || new Animated.Value(initialPage));

  // Atualiza a referência se scrollValue mudar
  useEffect(() => {
    if (scrollValue) {
      scrollValueRef.current = scrollValue;
    }
  }, [scrollValue]);

  // Ref para manter valores atualizados
  const valuesRef = useRef();
  valuesRef.current = {
    scrollViewRef,
    windowWidth,
    setCurrentPage,
    onChangeTab,
    children,
  };

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / windowWidth);
    const pageOffset = (offsetX % windowWidth) / windowWidth;

    if (page !== currentPage) {
      setCurrentPage(page);
      if (onChangeTab) {
        onChangeTab({ i: page, ref: children[page] });
      }
    }

    // Atualiza o scrollValue durante o scroll para animação suave
    if (scrollValueRef.current && scrollValueRef.current.setValue) {
      scrollValueRef.current.setValue(page + pageOffset);
    }
  };

  const handleTabPress = index => {
    const {
      scrollViewRef,
      windowWidth,
      setCurrentPage,
      onChangeTab,
      children,
    } = valuesRef.current;

    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * windowWidth,
        animated: true,
      });
      // Força atualização do estado também
      setCurrentPage(index);
      if (onChangeTab) {
        onChangeTab({ i: index, ref: children[index] });
      }
    }
  };

  // Atualiza o scrollValue quando a página muda
  useEffect(() => {
    if (scrollValueRef.current && scrollValueRef.current.setValue) {
      scrollValueRef.current.setValue(currentPage);
    }
  }, [currentPage]);

  const tabBarProps = {
    activeTab: currentPage,
    goToPage: handleTabPress,
    tabs: React.Children.map(children, child => child.props.tabLabel),
    scrollValue: scrollValueRef.current,
  };

  return (
    <View style={[{ flex: 1 }, style]}>
      {renderTabBar && renderTabBar(tabBarProps)}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={{
          width: windowWidth * React.Children.count(children),
        }}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <View key={index} style={{ width: windowWidth }}>
            {child}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScrollableTabView;
