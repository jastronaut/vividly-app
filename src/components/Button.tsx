import React from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps, View, Text } from 'react-native';

type ButtonProps = {
	size?: 'small' | 'large' | 'normal';
	color?: string;
};

const ButtonWrapper = styled.View<ButtonProps>`
	background-color: ${({ theme, color }) => color ?? theme.accentColor};
	padding: ${ ({size}) => size === 'normal' ? '5px 10px' : (size === 'large' ? '10px 15px' : '2px 5px')};
	border-radius: 5px;
`;

const ButtonText = styled.Text`
	color: white;
	text-align: center;
`;

const Button = (props: ButtonProps & PressableProps) => {
	const { children, size='normal', color, ...rest } = props;
	return (
		<Pressable {...rest}>
			<ButtonWrapper size={size} color={color}>
				<ButtonText>{children}</ButtonText>
			</ButtonWrapper>
		</Pressable>
	);
};

export default Button;
