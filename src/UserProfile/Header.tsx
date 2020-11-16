import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { FriendUser } from '../types';

const UserInfoContainer = styled.View`
	display: flex;
	flex-direction: row;
	border: 2px solid red;
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
`;

export const Username = styled.Text`
	color: #aaa;
	font-size: 15px;
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
			<Text>{user.bio}</Text>
		</UserInfoContainer>
	);
};

export default Header;
