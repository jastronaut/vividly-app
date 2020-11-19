import React, { useContext, useEffect } from 'react';
import { Text, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../AuthProvider';
import { HomeProps } from '../Routes/interfaces';
import { FeedContext } from '../FeedProvider';
import { FeedPreview, FriendUser, PostContent } from '../types';

import formatPostTime from '../utils/formatPostTime';

import Header from './Header';
import {
	ProfilePicPreview,
	FeedList,
	PostPreviewContainer,
	PreviewRight,
	PreviewName,
	UnreadIndicator,
	StyledSAV,
	PreviewText,
} from './styles';
import { ScreenContainer } from '../styles';

const formatPreview = (preview: PostContent) => {
	switch (preview.postType) {
		case 'text':
		case 'link':
			return (
				preview.content.substring(0, 35) +
				(preview.content.length > 35 ? '...' : '')
			);
		case 'image':
			return 'Image';
		default:
			return '';
	}
};

const renderFriendPreview = (
	feedPreview: FeedPreview,
	index: number,
	onPress: Function,
) =>
	feedPreview ? (
		// TODO: favorites indicator
		<Pressable
			key={feedPreview.user.id}
			onPress={() => onPress(feedPreview.user, index)}>
			{({ pressed }) => (
				<PostPreviewContainer>
					<ProfilePicPreview source={require('./pup.jpg')} />
					<PreviewRight>
						<PreviewName>{feedPreview.user.username}</PreviewName>
						{feedPreview.newestPost ? (
							<PreviewText>
								{formatPreview(feedPreview.newestPost.content)}
							</PreviewText>
						) : null}
					</PreviewRight>
					{feedPreview.user.unreadPosts ? (
						<UnreadIndicator>
							<Text>🟢</Text>
						</UnreadIndicator>
					) : null}
					<PreviewText>
						{feedPreview.newestPost &&
							formatPostTime(feedPreview.newestPost.createdTime)}
					</PreviewText>
				</PostPreviewContainer>
			)}
		</Pressable>
	) : (
		<Text>No</Text>
	);

const Home = ({ navigation }: HomeProps) => {
	const { authState } = useContext(AuthContext);
	const { feedState, getFeed } = useContext(FeedContext);
	const { isFeedLoading, feed } = feedState;

	useEffect(() => {
		getFeed(authState.jwt);
	}, []);

	const onPressFeedPreview = (user: FriendUser, index: number) => {
		navigation.navigate('UserProfile', {
			user,
			index,
		});
	};

	return (
		<StyledSAV>
			<ScreenContainer>
				<Header navigation={navigation} />
				<FeedList>
					{isFeedLoading ? (
						<Text>Loading</Text>
					) : (
						<FlatList<FeedPreview>
							data={feed}
							renderItem={({
								item,
								index,
							}: {
								item: FeedPreview;
								index: number;
							}) =>
								renderFriendPreview(
									item,
									index,
									onPressFeedPreview,
								)
							}
							keyExtractor={(
								feedPreview: FeedPreview,
								index: number,
							) => feedPreview.user.id + index.toString()}
						/>
					)}
				</FeedList>
			</ScreenContainer>
		</StyledSAV>
	);
};

export default Home;
