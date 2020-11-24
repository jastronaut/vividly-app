import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { BaseUser } from '../types';

const UserInfoContainer = styled.View`
	display: flex;
	flex-direction: row;
`;

const ProfilePictureContainer = styled.View``;

const ProfilePicture = styled.Image`
	border-radius: 25px;
	height: 50px;
	width: 50px;
	justify-content: center;
`;

const NamesContainer = styled.View`
	margin-left: 3%;
	align-self: center;
`;
const Name = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.main.fg};
`;

export const Username = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
	font-size: 15px;
`;

const Bio = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
`;

const Header = (props: BaseUser) => {
	const { name, username, bio } = props;

	return (
		<UserInfoContainer>
			<ProfilePictureContainer>
				<ProfilePicture
					source={{ uri: 'https://i.imgur.com/NSjoY6s.png' }}
				/>
			</ProfilePictureContainer>
			<NamesContainer>
				<Name>{name}</Name>
				<Username>@{username}</Username>
			</NamesContainer>
			<Bio>{bio}</Bio>
		</UserInfoContainer>
	);
};

export default Header;
