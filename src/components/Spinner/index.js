import React from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import { colors } from 'assets/styles';
import { Container } from './styles';

const Spinner = ({ size = 35, color = colors.primary, transparent = false, height }) => (
  <Container transparent={transparent} height={height}>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
        <ActivityIndicator size={size} color={color} />
      )}
  </Container>
);

export default Spinner;
