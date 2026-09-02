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
  const { height: screenHeight } = useMemo(() => Dimensions.get('window'), []);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const resolvedBottomInset =
    bottomInset ?? resolveTabBarBottomInset(insets.bottom);

  useEffect(() => {
    if (!visible) {
      setKeyboardHeight(0);
      return;
    }

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = Keyboard.addListener(showEvent, event => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const onHide = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, [visible]);

  // Com teclado aberto ele cobre a tab — não somar tab + teclado.
  const sheetBottomInset =
    keyboardHeight > 0 ? keyboardHeight : resolvedBottomInset;

  const availableForSheet = Math.max(
    MIN_SHEET_HEIGHT,
    screenHeight - sheetBottomInset - Math.max(insets.top, 8),
  );
  const maxHeight = Math.min(
    Math.round(screenHeight * maxHeightRatio),
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
        style={{ maxHeight, marginBottom: sheetBottomInset }}
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
