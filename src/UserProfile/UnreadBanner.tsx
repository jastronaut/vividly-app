import React from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';

const UnreadBannerContainer = styled.View`
	width: 100%;
	display: flex;
	background-color: red;
	opacity: 0.8;
	justify-content: center;
	align-items: center;
	padding: 2%;
`;

const UnreadBannerText = styled.Text`
	color: white;
`;

interface UnreadBannerProps {
	numUnreadPosts: number;
	onPress: () => void;
	isShowing: boolean;
}

const UnreadBanner = ({
	numUnreadPosts,
	onPress,
	isShowing,
}: UnreadBannerProps) =>
	isShowing ? (
		<Pressable onPress={onPress}>
			<UnreadBannerContainer>
				<UnreadBannerText>{`${numUnreadPosts} unread post${
					numUnreadPosts > 1 ? 's' : ''
				}`}</UnreadBannerText>
			</UnreadBannerContainer>
		</Pressable>
	) : null;

export default UnreadBanner;
