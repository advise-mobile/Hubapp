import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTabBarMetrics } from '@lhelpers/tabBarInsets';

import {
  Handle,
  HandleBar,
  Header,
  Title,
  ClearFilters,
  ClearText,
  SheetWrapper,
  Content,
  Footer,
  PrimaryButton,
  PrimaryButtonText,
} from './styles';
import type { BottomSheetProps } from './types';

export type { BottomSheetProps } from './types';

const DEFAULT_BACKDROP_OPACITY = 0.5;
const MIN_SHEET_HEIGHT = 200;

function resolveTabBarBottomInset(insetsBottom: number): number {
  const { height } = getTabBarMetrics(insetsBottom);
  return height;
}

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  footer,
  primaryButtonText,
  onPrimaryPress,
  clearFiltersLabel,
  onClearFilters,
  maxHeightRatio = 0.6,
  bottomInset,
  onModalHide,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const [windowHeight, setWindowHeight] = useState(
    () => Dimensions.get('window').height,
  );
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const resolvedBottomInset =
    bottomInset ?? resolveTabBarBottomInset(insets.bottom);
  const isKeyboardVisible = keyboardHeight > 0;

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setWindowHeight(window.height);
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (!visible) {
      setKeyboardHeight(0);
      setWindowHeight(Dimensions.get('window').height);
      return;
    }

    const showEvents =
      Platform.OS === 'ios'
        ? (['keyboardWillShow', 'keyboardDidShow'] as const)
        : (['keyboardDidShow'] as const);
    const hideEvents =
      Platform.OS === 'ios'
        ? (['keyboardWillHide', 'keyboardDidHide'] as const)
        : (['keyboardDidHide'] as const);

    const onShow = (event: { endCoordinates: { height: number } }) => {
      const height = event.endCoordinates.height;
      if (height <= 0) {
        return;
      }
      setWindowHeight(Dimensions.get('window').height);
      setKeyboardHeight(height);
    };
    const onHide = () => {
      setKeyboardHeight(0);
      setWindowHeight(Dimensions.get('window').height);
    };

    const showSubs = showEvents.map(eventName =>
      Keyboard.addListener(eventName, onShow),
    );
    const hideSubs = hideEvents.map(eventName =>
      Keyboard.addListener(eventName, onHide),
    );

    return () => {
      showSubs.forEach(sub => sub.remove());
      hideSubs.forEach(sub => sub.remove());
    };
  }, [visible]);

  // Android: o sistema já aplica IME (adjustResize / window insets). Somar
  // keyboardHeight de novo empurra o sheet para fora da área visível.
  // iOS: o window não encolhe — usar a altura do teclado como inset.
  const sheetBottomInset = isKeyboardVisible
    ? Platform.OS === 'ios'
      ? keyboardHeight
      : 0
    : resolvedBottomInset;

  const availableForSheet = Math.max(
    MIN_SHEET_HEIGHT,
    windowHeight - (isKeyboardVisible ? keyboardHeight : resolvedBottomInset) -
      Math.max(insets.top, 8),
  );
  const maxHeight = Math.min(
    Math.round(windowHeight * maxHeightRatio),
    availableForSheet,
  );

  const modalStyle = {
    justifyContent: 'flex-end' as const,
    margin: 0,
  };

  const customBackdrop = useMemo(
    () => (
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            marginBottom: sheetBottomInset,
            backgroundColor: `rgba(0,0,0,${DEFAULT_BACKDROP_OPACITY})`,
          }}
        />
      </TouchableWithoutFeedback>
    ),
    [onClose, sheetBottomInset],
  );

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onModalHide={onModalHide}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={modalStyle}
      useNativeDriver
      hideModalContentWhileAnimating
      customBackdrop={customBackdrop}
      backdropOpacity={1}
    >
      <SheetWrapper
        style={{
          maxHeight: isKeyboardVisible && Platform.OS === 'android' ? '100%' : maxHeight,
          marginBottom: sheetBottomInset,
          ...(isKeyboardVisible
            ? {
                height:
                  Platform.OS === 'android' ? '100%' : maxHeight,
              }
            : null),
        }}
        accessible={false}
      >
        <Handle>
          <HandleBar />
        </Handle>
        <Header>
          <Title>{title}</Title>
          {clearFiltersLabel != null && onClearFilters != null && (
            <ClearFilters onPress={onClearFilters}>
              <ClearText>{clearFiltersLabel}</ClearText>
            </ClearFilters>
          )}
        </Header>
        <Content
          $keyboardOpen={isKeyboardVisible}
          contentContainerStyle={{
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 16,
          }}
        >
          {children}
        </Content>
        {footer != null ? <Footer>{footer}</Footer> : null}
        {primaryButtonText != null && onPrimaryPress != null && (
          <Footer>
            <PrimaryButton onPress={onPrimaryPress} activeOpacity={0.8}>
              <PrimaryButtonText>{primaryButtonText}</PrimaryButtonText>
            </PrimaryButton>
          </Footer>
        )}
      </SheetWrapper>
    </RNModal>
  );
}
