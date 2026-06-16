import React, { useMemo } from 'react';
import {
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

/** Alinhado à tab bar em legacy/navigation/Routes.js */
function resolveTabBarBottomInset(insetsBottom: number): number {
  const tabBarBaseHeight = Platform.OS === 'android' ? 64 : 80;
  return tabBarBaseHeight + insetsBottom;
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
  const maxHeight = Math.round(screenHeight * maxHeightRatio);
  const resolvedBottomInset =
    bottomInset ?? resolveTabBarBottomInset(insets.bottom);

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
            marginBottom: resolvedBottomInset,
            backgroundColor: `rgba(0,0,0,${DEFAULT_BACKDROP_OPACITY})`,
          }}
        />
      </TouchableWithoutFeedback>
    ),
    [onClose, resolvedBottomInset],
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
        style={{ maxHeight, marginBottom: resolvedBottomInset }}
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
