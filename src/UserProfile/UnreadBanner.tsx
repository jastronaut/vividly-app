import React from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';

import { FriendUser } from '../types';

const UnreadBannerContainer = styled.View`
	/* position: absolute; */
	width: 100%;
	display: flex;
	background-color: red;
	justify-content: center;
	align-items: center;
	padding: 2%;
`;

const UnreadBannerText = styled.Text`
	color: white;
`;

interface UnreadBannerProps {
	user: FriendUser;
	onPress: () => void;
	isShowing: boolean;
}

const UnreadBanner = ({ user, onPress, isShowing }: UnreadBannerProps) =>
	isShowing ? (
		<Pressable
			onPress={() => {
				console.log('pressed');
				onPress();
			}}>
			<UnreadBannerContainer>
				<UnreadBannerText>{`${user.unreadPosts} unread post${
					user.unreadPosts > 1 ? 's' : ''
				}`}</UnreadBannerText>
			</UnreadBannerContainer>
		</Pressable>
	) : null;

export default UnreadBanner;
