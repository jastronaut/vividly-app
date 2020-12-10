import React, { useContext, useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

import { ProfileContext } from './ProfileProvider';
import { ProfileHeaderContext } from './ProfileHeaderProvider';
import { FeedContext } from '../FeedProvider';
import { AuthContext } from '../AuthProvider';

import ScreenLoadingIndicator from '../components/ScreenLoadingIndicator';
import UnreadBanner from './UnreadBanner';
import PostsList from './PostsList';
import { FriendUser, Post } from '../types';
import { UserProfileProps } from '../Routes/interfaces';
import { ScreenContainer } from './styles';
import MoreInfo from './MoreInfo';
import Header from './Header';

const UserProfileComponent = ({ navigation, route }: UserProfileProps) => {
	const { setInfoShowing } = useContext(ProfileHeaderContext);
	const { feedState, markFeedRead } = useContext(FeedContext);
	const { feed } = feedState;
	const { getPosts, state, clearPosts } = useContext(ProfileContext);
	const { posts, isProfileLoading } = state;
	const { jwt } = useContext(AuthContext).authState;

	const [user, setUser] = useState(route.params.user);
	const [index, setIndex] = useState(route.params.index);
	const [isUnreadBannerShowing, setIsUnreadBannerShowing] = useState<boolean>(
		false,
	);
	const [numUnreadPosts, setNumUnreadPosts] = useState<number>(0);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const postListRef = useRef<FlatList>(null);
	const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

	useEffect(() => {
		return () => {
			setInfoShowing(false);
			clearPosts();
		};
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => <Header {...user} />,
		});
	}, [user]);

	useEffect(() => {
		const user = route.params.user;
		if (user.unreadPosts > 0) {
			setIsUnreadBannerShowing(true);
		} else {
			setIsUnreadBannerShowing(false);
		}
		setNumUnreadPosts(user.unreadPosts);
		markFeedRead(user.id);
		setUser(user);
		setIndex(route.params.index);
		getPosts(route.params.user.id);
		setTimeout(() => setIsPageLoading(false), 100);
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
			getPosts(nextUser.id);
		} else {
			console.log('cant find');
		}
	};

	const onPressUnreadBanner = () => {
		if (postListRef && postListRef.current) {
			postListRef!.current!.scrollToIndex({
				index: numUnreadPosts - 1,
				viewPosition: 1,
			});
			setIsUnreadBannerShowing(false);
		}
	};

	const onPressPost = (post: Post) => {
		navigation.navigate('PostPage', {
			user,
			postId: post.id,
			fromPage: 'profile',
		});
	};

	const onLongPressPost = (postId: string) => {
		return null;
	};

	if (isProfileLoading || isPageLoading) return <ScreenLoadingIndicator />;

	return (
		<>
			<ScreenContainer>
				<MoreInfo bio={user.bio} />
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
						onLongPressPost={onLongPressPost}
						postListRef={postListRef}
					/>
				)}
			</ScreenContainer>
		</>
	);
};

const UserProfile = ({ navigation, route }: UserProfileProps) => {
	return <UserProfileComponent navigation={navigation} route={route} />;
};

export default UserProfile;
