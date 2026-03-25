import { useMemo } from 'react';
import { Platform, StyleSheet, type TextStyle } from 'react-native';
import type { PickerStyle } from 'react-native-picker-select';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { fonts } from '@lassets/styles';

/**
 * O `react-native-picker-select` só aceita a prop `style` no formato `PickerStyle`:
 * chaves fixas (`inputIOS`, `inputAndroid`, `headlessAndroidContainer`, etc.) que a
 * lib aplica aos `TextInput` / `Picker` nativos internos. Isso não combina com
 * `styled(Text)` / `styled(TextInput)` — por isso essa parte permanece em `StyleSheet`.
 * O layout à volta (wrap + overlay de toque no iOS) usa styled-components abaixo.
 */

type PickerThemeSlice = {
  grayDarker: string;
  grayLight: string;
};

export const LoadingWrap = styled.View`
  min-height: 36px;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 2px 8px 0;
`;

/** Área do picker (overlay de iOS posiciona-se em cima disto). */
export const SelectWrap = styled.View`
  position: relative;
  min-height: 40px;
  align-self: stretch;
`;

/**
 * iOS + modal aninhado (ex.: BottomSheet): o toque no texto nem sempre chega ao
 * `TouchableOpacity` interno da lib — esta camada chama `togglePicker` via ref.
 */
export const SelectTouchOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

function createRNPickerSelectStyles(theme: PickerThemeSlice): PickerStyle {
  const book = String(fonts.circularStdBook);
  const size = Number(fonts.regular);

  const inputIOS: TextStyle = {
    fontSize: size,
    color: theme.grayDarker,
    fontFamily: book,
    paddingVertical: 8,
    paddingRight: 4,
  };

  const inputAndroid: TextStyle = {
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontSize: size,
    color: theme.grayDarker,
    fontFamily: book,
    textAlignVertical: 'center',
    includeFontPadding: false,
  };

  const shared = {
    inputIOS,
    inputAndroid,
    inputAndroidContainer: {
      minHeight: 40,
    },
    iconContainer: {
      top: 10,
    },
    placeholder: {
      color: theme.grayLight,
    },
  };

  if (Platform.OS === 'android') {
    return StyleSheet.create({
      ...shared,
      viewContainer: { alignItems: 'center' as const },
      chevronContainer: { display: 'none' as const },
      chevron: { display: 'none' as const },
      headlessAndroidContainer: {
        minHeight: 40,
        alignSelf: 'stretch' as const,
      },
    }) as unknown as PickerStyle;
  }

  return StyleSheet.create({
    ...shared,
    inputIOSContainer: {
      minHeight: 40,
    },
  }) as unknown as PickerStyle;
}

/**
 * Lê `grayDarker` / `grayLight` do tema e devolve o `PickerStyle` da lib.
 * A lógica fica numa função pura + `useMemo` porque o pacote exige `StyleSheet`,
 * não `styled()`, e há bifurcação por plataforma.
 */
export function useRNPickerSelectStyles(): PickerStyle {
  const { colors } = useTheme();
  return useMemo(
    () =>
      createRNPickerSelectStyles({
        grayDarker: colors.grayDarker,
        grayLight: colors.grayLight,
      }),
    [colors.grayDarker, colors.grayLight],
  );
}
