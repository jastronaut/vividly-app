import React from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps, View, Text } from 'react-native';

const ButtonWrapper = styled.View`
	background-color: ${({ theme }) => theme.accentColor};
	padding: 5px 10px;
	border-radius: 5px;
`;

const ButtonText = styled.Text`
	color: white;
	text-align: center;
`;

const Button = (props: PressableProps) => {
	const { children, ...rest } = props;
	return (
		<Pressable {...rest}>
			<ButtonWrapper>
				<ButtonText>{children}</ButtonText>
			</ButtonWrapper>
		</Pressable>
	);
};

export default Button;
