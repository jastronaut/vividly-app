import React, { useContext, useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Image } from 'react-native';

import ProfileProvider, { ProfileContext } from '../ProfileProvider';
import { AuthContext } from '../../AuthProvider';

import Header from '../Header';
import ScreenLoadingIndicator from '../../components/ScreenLoadingIndicator';
import PostsList from '../PostsList';
import { AuthUser, FriendUser, Post } from '../../types';
import { UserProfileProps } from '../../Routes/interfaces';
import { ScreenContainer } from '../styles';
import { AddPostButton } from './styles';

const AuthUserProfileComponent = ({ navigation, route }: UserProfileProps) => {
	const { state, getPosts } = useContext(ProfileContext);
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

	const postListRef = useRef(null);

	const onPressPost = (post: Post) => {
		navigation.navigate('PostPage', {
			user: baseAuthUser,
			postId: post.id,
			fromPage: 'profile',
		});
	};

	useEffect(() => {
		getPosts(jwt, authUser.id);
	}, []);

	return (
		<>
			{isProfileLoading ? <ScreenLoadingIndicator /> : null}
			<ScreenContainer withoutPadding>

				{!isProfileLoading && (
					<PostsList
						onRefreshPage={null}
						posts={posts}
						isRefreshing={null}
						onPressPost={onPressPost}
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
