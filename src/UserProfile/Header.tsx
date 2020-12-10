import React, { useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import styled from 'styled-components/native';

import { BaseUser } from '../types';
import Info from '../components/Icons/Info';
import Gear from '../components/Icons/Gear';
import { ProfileHeaderContext } from './ProfileHeaderProvider';

const UserInfoContainer = styled.View`
width: 90%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 10px;
`;

const LeftSide = styled.View`
	display: flex;
	flex-direction: row;
`;

const ProfilePictureContainer = styled.View``;

const ProfilePicture = styled.Image`
	border-radius: 20px;
	height: 40px;
	width: 40px;
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


type Props = {
	isAuthUser?: boolean;
};

const Header = (props: Props & BaseUser) => {
	const { name, username } = props;
	const { toggleInfoShowing } = useContext(ProfileHeaderContext);

	return (
		<UserInfoContainer>
			<LeftSide>
				<ProfilePictureContainer>
					<ProfilePicture source={require('../pup.jpg')} />
				</ProfilePictureContainer>
				<NamesContainer>
					<Name>{name}</Name>
					<Username>@{username}</Username>
				</NamesContainer>
			</LeftSide>
		</UserInfoContainer>
	);
};

export default Header;
