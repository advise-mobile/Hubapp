import React, { useMemo } from 'react';
import {
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import RNModal from 'react-native-modal';

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

export function BottomSheet({
  visible,
  onClose,
  title,
  children,
  primaryButtonText,
  onPrimaryPress,
  clearFiltersLabel,
  onClearFilters,
  maxHeightRatio = 0.6,
  bottomInset = Platform.OS === 'android' ? 64 : 80,
}: BottomSheetProps) {
  const { height: screenHeight } = useMemo(() => Dimensions.get('window'), []);
  const maxHeight = Math.round(screenHeight * maxHeightRatio);

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
            marginBottom: bottomInset,
            backgroundColor: `rgba(0,0,0,${DEFAULT_BACKDROP_OPACITY})`,
          }}
        />
      </TouchableWithoutFeedback>
    ),
    [onClose, bottomInset],
  );

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={modalStyle}
      useNativeDriver
      hideModalContentWhileAnimating
      customBackdrop={customBackdrop}
      backdropOpacity={1}
    >
      <SheetWrapper
        style={{ maxHeight, marginBottom: bottomInset }}
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
        <Content>{children}</Content>
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
