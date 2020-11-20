import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { FriendUser } from '../types';

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

type HeaderProps = {
	user: FriendUser;
};

const Header = (props: HeaderProps) => {
	const { user } = props;

	return (
		<UserInfoContainer>
			<ProfilePictureContainer>
				<ProfilePicture
					source={{ uri: 'https://i.imgur.com/NSjoY6s.png' }}
				/>
			</ProfilePictureContainer>
			<NamesContainer>
				<Name>{user.name}</Name>
				<Username>@{user.username}</Username>
			</NamesContainer>
			<Bio>{user.bio}</Bio>
		</UserInfoContainer>
	);
};

export default Header;
