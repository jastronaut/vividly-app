import React, { useContext, useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import ProfileProvider, { ProfileContext } from '../ProfileProvider';
import { AuthContext } from '../../AuthProvider';

import Header from '../Header';
import ScreenLoadingIndicator from '../../components/ScreenLoadingIndicator';
import PostsList from '../PostsList';
import { AuthUser, FriendUser, Post } from '../../types';
import { UserProfileProps } from '../../Routes/interfaces';
import { ScreenContainer } from '../styles';
import AddPost from './AddPost';
import { AddPostButton } from './styles';

const AuthUserProfileComponent = ({ navigation, route }: UserProfileProps) => {
	const { state, setPosts } = useContext(ProfileContext);
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
			post,
		});
	};

	useEffect(() => {
		setPosts(authUser.posts);
	}, []);

	return (
		<>
			{isProfileLoading ? <ScreenLoadingIndicator /> : null}

			<KeyboardAvoidingView keyboardVerticalOffset={0} behavior='height'>
				<ScreenContainer>
					<Header {...baseAuthUser} />

					{!isProfileLoading && (
						<PostsList
							onRefreshPage={null}
							posts={posts}
							isRefreshing={null}
							onPressPost={onPressPost}
							postListRef={postListRef}
						/>
					)}
					<AddPostButton onPress={() => navigation.navigate('AddPost')} />
				</ScreenContainer>
			</KeyboardAvoidingView>
		</>
	);
};

const AuthUserProfile = ({ navigation, route }: UserProfileProps) => {
	return (
		<ProfileProvider>
			<AuthUserProfileComponent navigation={navigation} route={route} />
		</ProfileProvider>
	);
};

export default AuthUserProfile;
