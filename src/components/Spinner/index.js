import React from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import { Container } from './styles';

// Add Hook UseTheme para pegar o tema global addicionado
import { useTheme } from 'styled-components';


const Spinner = ({ size = 35, color = null, transparent = false, height }) => {     	

  // Variavel para usar o hook
	const colorUseTheme = useTheme();
	const { colors } = colorUseTheme;  

  if(color === null){
    color = colors.primary;
  }

  return (
    <Container transparent={transparent} height={height}>
      {Platform.OS === 'ios' ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
          <ActivityIndicator size={size} color={color} />
        )}
    </Container>
  )
};

export default Spinner;
