import React from 'react';
import { Pressable, Linking } from 'react-native';
import styled from 'styled-components/native';

const LinkStyled = styled.Text<{ isPressed: boolean }>`
	color: ${({ theme }) => theme.accentColor};
	text-decoration: ${({ isPressed }) => (isPressed ? 'underline' : 'none')};
	padding: 0 4%;
`;

const LinkText = ({ url }: { url: string }) => {
	const handlePress = () => {
		const checkLinkSupported = async () => {
			const supported = await Linking.canOpenURL(url);
			if (supported) {
				await Linking.openURL(url);
			}
		};
		checkLinkSupported();
	};
	return (
		<Pressable onPress={handlePress}>
			{({ pressed }) => (
				<LinkStyled isPressed={pressed}>{url}</LinkStyled>
			)}
		</Pressable>
	);
};

export default LinkText;
