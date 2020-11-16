import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Image } from 'react-native';

import ProfileContext, { useProvideProfile } from './ProfileContext';
import FeedContext from '../FeedContext';
import { AuthContext } from '../hooks/useAuth';

import Header from './Header';
import ScreenLoadingIndicator from './ScreenLoadingIndicator';
import UnreadBanner from './UnreadBanner';
import PostsList from './PostsList';
import { FriendUser, Post } from '../types';
import { UserProfileProps } from '../Routes/interfaces';
import { ScreenContainer } from './styles';

const UserProfileComponent = ({ navigation, route }: UserProfileProps) => {
	const { getNextUser } = useContext(FeedContext);
	const { getUserFeed, posts } = useContext(ProfileContext);
	const { jwt } = useContext(AuthContext);

	const [user, setUser] = useState(route.params.user);
	const [index, setIndex] = useState(route.params.index);
	const [isUnreadBannerShowing, setIsUnreadBannerShowing] = useState<boolean>(
		false,
	);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
	const postListRef = useRef(null);

	useEffect(() => {
		if (user.unreadPosts > 0) {
			setIsUnreadBannerShowing(true);
		} else {
			setIsUnreadBannerShowing(false);
		}
	}, [user]);

	useEffect(() => {
		setUser(route.params.user);
		setIndex(route.params.index);
		getUserFeed(route.params.user.id, jwt);
	}, [route.params.user, route.params.index]);

	const onRefresh = () => {
		setIsScreenLoading(true);
		const nextUser = getNextUser(index);
		// markFeedRead(route.params.index);
		if (nextUser && jwt) {
			setUser(nextUser);
			setIndex(index + 1);
			getUserFeed(nextUser.id, jwt);
		} else {
			console.log('cant find');
		}

		setIsScreenLoading(false);
	};

	const onPressUnreadBanner = () => {
		if (postListRef && postListRef.current) {
			postListRef.current.scrollToIndex({
				index: user.unreadPosts,
				viewPosition: 1,
			});
			setIsUnreadBannerShowing(false);
		}
	};

	const onPressPost = (post: Post) => {
		navigation.navigate('PostPage', {
			user,
			post,
		});
	};

	return (
		<>
			{isScreenLoading ? <ScreenLoadingIndicator /> : null}
			<ScreenContainer>
				<Header user={user} />

				<UnreadBanner
					user={user}
					onPress={onPressUnreadBanner}
					isShowing={isUnreadBannerShowing}
				/>

				{posts ? (
					<PostsList
						onRefreshPage={onRefresh}
						posts={posts}
						isRefreshing={isRefreshing}
						onPressPost={onPressPost}
						postListRef={postListRef}
					/>
				) : (
					<Text>Wat</Text>
				)}
			</ScreenContainer>
		</>
	);
};

const UserProfile = ({ navigation, route }: UserProfileProps) => {
	const profileValues = useProvideProfile();

	return (
		<ProfileContext.Provider value={profileValues}>
			<UserProfileComponent navigation={navigation} route={route} />
		</ProfileContext.Provider>
	);
};

export default UserProfile;
