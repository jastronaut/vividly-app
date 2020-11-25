import React from 'react';
import { Text, Pressable } from 'react-native';
import styled from 'styled-components/native';

const AddPostButtonWrapper = styled.View`
	position: absolute;
	bottom: 50px;
	right: 5%;
	width: 50px;
	height: 50px;
	background-color: ${({ theme }) => theme.accentColor};
	border-radius: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 5px 5px 2px ${({ theme }) => theme.colors.main.bg};
`;

export const AddPostButton = (props: { onPress: Function }) => {
	return (
		<Pressable onPress={() => props.onPress()}>
			<AddPostButtonWrapper>
				<Text style={{ color: 'white', fontSize: 24 }}>+</Text>
			</AddPostButtonWrapper>
		</Pressable>
	);
};
