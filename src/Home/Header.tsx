import React from 'react';
import styled from 'styled-components/native';
import { Text, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

export const Title = styled.Text`
	font-size: 40px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.main.fg};
`;
export const HeaderContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
export const IconsContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 25%;
`;

type HeaderProps = {
	navigation: any;
};

const Header = ({ navigation }: HeaderProps) => {
	return (
		<HeaderContainer>
			<Title>Home</Title>
			<IconsContainer>
				<Pressable onPress={() => navigation.navigate('Search')}>
					<Text>
						<Icon name='search' size={30} />
					</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('AppSettings')}>
					<Text>
						<Icon name='settings' size={30} />
					</Text>
				</Pressable>
			</IconsContainer>
		</HeaderContainer>
	);
};

export default Header;
