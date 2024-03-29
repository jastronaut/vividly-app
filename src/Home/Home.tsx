import React, { useContext, useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';

import { AuthContext } from '../AuthProvider';
import { HomeProps } from '../Routes/interfaces';
import { FeedContext } from '../FeedProvider';
import { FeedPreview, FriendUser } from '../types';

import Header from './Header';
import { FeedList, StyledSAV } from './styles';
import { ScreenContainer } from '../styles';
import FeedPreviewComponent from './FeedPreviewComponent';

const Home = ({ navigation }: HomeProps) => {
	const { authState } = useContext(AuthContext);
	const { feedState, getFeed } = useContext(FeedContext);
	const { isFeedLoading, feed, authUserFeed } = feedState;
	const [friendQuery, setFriendQuery] = useState<string>('');

	const filteredFriends = friendQuery.length
		? feed.filter(
				(friend) =>
					friend.user.name.indexOf(friendQuery) > -1 ||
					friend.user.username.indexOf(friendQuery) > -1,
		  )
		: feed;

	useEffect(() => {
		getFeed();
	}, []);

	const onPressFeedPreview = (user: FriendUser, index: number) => {
		navigation.navigate('UserProfile', {
			user,
			index,
		});
	};

	const onPressAuthUserPreview = () => {
		navigation.navigate('AuthUserProfile');
	};

	return (
		<StyledSAV>
			<ScreenContainer>
				{isFeedLoading || !authUserFeed ? null : (
					<Header
						friendQuery={friendQuery}
						setFriendQuery={setFriendQuery}
						onPressSettings={() =>
							navigation.navigate('AppSettings')
						}
						onPressAuthUserPreview={onPressAuthUserPreview}
						authUserFeed={authUserFeed}
					/>
				)}
				<FeedList>
					{isFeedLoading ? (
						<Text>Loading</Text>
					) : (
						<FlatList<FeedPreview>
							data={filteredFriends}
							renderItem={({
								item,
								index,
							}: {
								item: FeedPreview;
								index: number;
							}) => (
								<FeedPreviewComponent
									key={item.user.id}
									feedPreview={item}
									index={index}
									onPress={onPressFeedPreview}
								/>
							)}
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
