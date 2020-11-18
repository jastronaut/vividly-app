import React, { useContext, useState, useEffect, useRef } from 'react';

import ProfileProvider, { ProfileContext } from './ProfileProvider';
import { FeedContext } from '../FeedProvider';
import { AuthContext } from '../AuthProvider';

import Header from './Header';
import ScreenLoadingIndicator from './ScreenLoadingIndicator';
import UnreadBanner from './UnreadBanner';
import PostsList from './PostsList';
import { FriendUser, Post } from '../types';
import { UserProfileProps } from '../Routes/interfaces';
import { ScreenContainer } from './styles';

const UserProfileComponent = ({ navigation, route }: UserProfileProps) => {
	const { feedState, markFeedRead } = useContext(FeedContext);
	const { feed } = feedState;
	const { getPosts, state } = useContext(ProfileContext);
	const { posts, isProfileLoading } = state;
	const { jwt } = useContext(AuthContext).authState;

	const [user, setUser] = useState(route.params.user);
	const [index, setIndex] = useState(route.params.index);
	const [isUnreadBannerShowing, setIsUnreadBannerShowing] = useState<boolean>(
		false,
	);
	const [numUnreadPosts, setNumUnreadPosts] = useState<number>(0);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const postListRef = useRef(null);

	useEffect(() => {
		const user = route.params.user;
		if (user.unreadPosts > 0) {
			setIsUnreadBannerShowing(true);
		} else {
			setIsUnreadBannerShowing(false);
		}
		setNumUnreadPosts(user.unreadPosts);
		markFeedRead(jwt, user.id);
		setUser(user);
		setIndex(route.params.index);
		getPosts(jwt, route.params.user.id);
	}, [route.params.user, route.params.index]);

	const getNextUser = (index: number) => {
		if (index >= feed.length - 1) return null;
		let newIndex = 0;
		if (index < 0) newIndex = 0;
		else newIndex = index + 1;
		const nextUser = feed[newIndex].user;
		if (nextUser.unreadPosts > 0) return nextUser;
		return null;
	};

	const onRefresh = () => {
		const nextUser = getNextUser(index);
		if (nextUser && jwt) {
			setUser(nextUser);
			setIndex(index + 1);
			getPosts(jwt, nextUser.id);
		} else {
			console.log('cant find');
		}
	};

	const onPressUnreadBanner = () => {
		if (postListRef && postListRef.current) {
			postListRef!.current!.scrollToIndex({
				index: numUnreadPosts,
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
			{isProfileLoading ? <ScreenLoadingIndicator /> : null}
			<ScreenContainer>
				<Header user={user} />
				<UnreadBanner
					numUnreadPosts={numUnreadPosts}
					onPress={onPressUnreadBanner}
					isShowing={isUnreadBannerShowing}
				/>

				{!isProfileLoading && (
					<PostsList
						onRefreshPage={onRefresh}
						posts={posts}
						isRefreshing={isRefreshing}
						onPressPost={onPressPost}
						postListRef={postListRef}
					/>
				)}
			</ScreenContainer>
		</>
	);
};

const UserProfile = ({ navigation, route }: UserProfileProps) => {
	return (
		<ProfileProvider>
			<UserProfileComponent navigation={navigation} route={route} />
		</ProfileProvider>
	);
};

export default UserProfile;
