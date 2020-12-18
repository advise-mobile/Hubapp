import React from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import { colors } from 'assets/styles';
import { Container } from './styles';

const Spinner = ({ size = 35, color = colors.primary }) => (
  <Container>
    {Platform.OS === 'ios' ? (
      <ActivityIndicator size="small" color={color} />
    ) : (
        <ActivityIndicator size={size} color={color} />
      )}
  </Container>
);

export default Spinner;
