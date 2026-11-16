import React, { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { fonts } from '@lassets/styles';

type Align = 'left' | 'right' | 'center';

const Root = styled(TextInput)<{ $textAlign: Align }>`
	align-self: stretch;
	flex: 1;
	min-width: 0;
	width: 100%;
	text-align: ${({ $textAlign }) => $textAlign};
	padding: 0px;
	font-size: ${fonts.regular}px;
	font-family: ${fonts.circularStdBook};
	color: ${({ theme }) => theme.colors.primary};
`;

export interface FormInputWithoutBorderProps
	extends Omit<TextInputProps, 'textAlign'> {
	textAlign?: Align;
}

export const FormInputWithoutBorder = forwardRef<
	TextInput,
	FormInputWithoutBorderProps
>(({ textAlign = 'left', style, ...rest }, ref) => (
	<Root {...rest} ref={ref} $textAlign={textAlign} style={style} />
));

FormInputWithoutBorder.displayName = 'FormInputWithoutBorder';
