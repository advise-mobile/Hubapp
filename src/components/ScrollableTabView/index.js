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
  const isScrollViewReady = useRef(false);
  const windowWidth = Dimensions.get('window').width;

  // Usa o scrollValue passado como prop ou cria um mock simples
  const scrollValueRef = useRef(scrollValue || new Animated.Value(initialPage));

  // Atualiza a referência se scrollValue mudar
  useEffect(() => {
    if (scrollValue) {
      scrollValueRef.current = scrollValue;
    }
  }, [scrollValue]);

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
    const targetX = index * windowWidth;

    const scrollToPage = () => {
      if (scrollViewRef && scrollViewRef.current) {
        try {
          scrollViewRef.current.scrollTo({
            x: targetX,
            animated: true,
          });
          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    };

    // Tenta imediatamente
    if (!scrollToPage()) {
      // Se não funcionou, tenta após um pequeno delay
      setTimeout(() => {
        if (!scrollToPage()) {
          // Última tentativa
          setTimeout(scrollToPage, 100);
        }
      }, 50);
    }
  };

  // Atualiza o scrollValue quando a página muda
  useEffect(() => {
    if (scrollValueRef.current && scrollValueRef.current.setValue) {
      scrollValueRef.current.setValue(currentPage);
    }
  }, [currentPage]);

  return (
    <View style={[{ flex: 1 }, style]}>
      {renderTabBar &&
        renderTabBar({
          activeTab: currentPage,
          goToPage: handleTabPress,
          tabs: React.Children.map(children, child => child.props.tabLabel),
          scrollValue: scrollValueRef.current,
        })}

      <ScrollView
        ref={scrollViewRef}
        onLayout={() => {
          isScrollViewReady.current = true;
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
