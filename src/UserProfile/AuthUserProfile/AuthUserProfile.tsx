import React, { useContext, useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { ProfileHeaderContext } from '../ProfileHeaderProvider';
import { ProfileContext } from '../ProfileProvider';
import { AuthContext } from '../../AuthProvider';

import ScreenLoadingIndicator from '../../components/ScreenLoadingIndicator';
import PostsList from '../PostsList';
import { AuthUser, FriendUser, Post } from '../../types';
import { UserProfileProps } from '../../Routes/interfaces';
import { ScreenContainer } from '../styles';
import { AddPostButton } from './styles';
import MoreInfo from '../MoreInfo';

const ACTION_SHEET_OPTIONS = {
	options: ['Delete post', 'Cancel'],
	destructiveButtonIndex: 0,
	cancelButtonIndex: 1,
};

const AuthUserProfileComponent = ({ navigation, route }: UserProfileProps) => {
	const { setInfoShowing } = useContext(ProfileHeaderContext);
	const { showActionSheetWithOptions } = useActionSheet();
	const { state, getPosts, deletePost } = useContext(ProfileContext);
	const { posts, isProfileLoading } = state;
	const { jwt, authUser } = useContext(AuthContext).authState;
	if (!authUser) return null;

	const baseAuthUser = {
		id: authUser.id,
		name: authUser.name,
		username: authUser.username,
		bio: authUser.bio,
		profilePicture: authUser.profilePicture,
	};

	const deletePostConfirmation = (postId: string) =>
		Alert.alert(
			'Delete post?',
			"You will not be able to recover this post once it's deleted.",
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => deletePost(postId),
					style: 'destructive',
				},
			],
			{ cancelable: false },
		);

	const postListRef = useRef(null);

	const onPressPost = (post: Post) => {
		navigation.navigate('PostPage', {
			user: baseAuthUser,
			postId: post.id,
			fromPage: 'profile',
		});
	};

	const onLongPressPost = (postId: string) => {
		showActionSheetWithOptions(ACTION_SHEET_OPTIONS, (buttonIndex) => {
			if (buttonIndex !== 0) return;
			deletePostConfirmation(postId);
		});
	};

	useEffect(() => {
		getPosts(jwt, authUser.id);
	}, []);

	return (
		<>
			{isProfileLoading ? <ScreenLoadingIndicator /> : null}
			<ScreenContainer withoutPadding>
				<MoreInfo bio={authUser.bio} isAuthUser />

				{!isProfileLoading && (
					<PostsList
						onRefreshPage={null}
						posts={posts}
						isRefreshing={null}
						onPressPost={onPressPost}
						onLongPressPost={onLongPressPost}
						postListRef={postListRef}
					/>
				)}
			</ScreenContainer>

			<AddPostButton onPress={() => navigation.navigate('AddPost')} />
		</>
	);
};

const AuthUserProfile = ({ navigation, route }: UserProfileProps) => {
	return <AuthUserProfileComponent navigation={navigation} route={route} />;
};

export default AuthUserProfile;
