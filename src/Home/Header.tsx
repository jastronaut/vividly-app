import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Pressable, View } from 'react-native';

import { AuthContext } from '../AuthProvider';
import FeedPreviewComponent from './FeedPreviewComponent';
import Button from '../components/Button';
import Gear from '../components/Icons/Gear';
import { AuthUser, FeedPreview, PostPreview } from '../types';

export const Title = styled.Text`
	font-size: 40px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.main.fg};
`;

export const HeaderContainer = styled.View``;

export const Buttons = styled.View`
	margin: 3% 0%;
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: space-between;
`;

const ButtonStyled = styled(Button)`
	flex-grow: 2;
	margin-right: 3%;
`;

const Input = styled.TextInput.attrs(({ theme }) => ({
	placeholderTextColor: theme.colors.muted.fg,
}))`
	border-radius: 15px;
	border: solid 1px ${({ theme }) => theme.colors.border};
	padding: 2% 1%;
	color: ${({ theme }) => theme.colors.main.fg};
	width: 100%;
`;

// i kinda hate this!
const makeAuthUserPreview = (authUser: AuthUser): FeedPreview => {
	let newestPost = null;
	if (authUser.posts.length) {
		const latestPost = authUser.posts[0];
		newestPost = {
			id: latestPost.id,
			createdTime: latestPost.createdTime,
			content: latestPost.content[0]
		};
	}

	const { id, name, username, bio, profilePicture } = authUser;

	return ({
		newestPost,
		user: {
			id,
			name,
			username,
			bio,
			profilePicture,
			isFavorite: false,
			unreadPosts: 0
		}
	});

}

type HeaderProps = {
	friendQuery: string;
	setFriendQuery: Function;
	onPressSettings: Function;
onPressAuthUserPreview: Function;
};

const Header = ({ friendQuery, setFriendQuery, onPressSettings, onPressAuthUserPreview }: HeaderProps) => {
	const { authUser } = useContext(AuthContext).authState;
	if (!authUser) return null;
	const authUserPreview = makeAuthUserPreview(authUser);

	return (
		<HeaderContainer>
			<View>
				<Input
					onChangeText={(text) => setFriendQuery(text)}
					value={friendQuery}
					placeholder='Search Friends'
					autoCapitalize='none'
				/>
			</View>
			<FeedPreviewComponent feedPreview={authUserPreview} index={0} onPress={onPressAuthUserPreview} />
			<View>
				<Buttons>
					<ButtonStyled size='large' color='gray'>
						Send Feedback
					</ButtonStyled>
					<ButtonStyled size='large' color='green'>
						Add Friends...
					</ButtonStyled>
					<Pressable onPress={() => onPressSettings()}>
					<Gear />
					</Pressable>
				</Buttons>
			</View>
		</HeaderContainer>
	);
};

export default Header;
