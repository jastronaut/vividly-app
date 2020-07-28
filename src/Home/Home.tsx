import React, { useContext } from 'react';
import { Text, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppContext from '../AppContext';
import { PostContent, HomeProps, User } from '../interfaces';

import {
	Header,
	IconsContainer,
	ProfilePicPreview,
	FeedList,
	PostPreviewContainer,
	PreviewRight,
	PreviewName,
	UnreadIndicator,
} from './styles';
import { Title, ScreenContainer } from '../styles';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

const formatPreview = (preview: PostContent) => {
	switch (preview.type) {
		case 'text':
		case 'link':
			return (
				preview.content.substring(0, 35) +
				(preview.content.length > 35 ? '...' : '')
			);
			break;
		case 'image':
			return 'Image';
			break;
		default:
			return '';
	}
};

const renderFriendPreview = (item: User, index: number, navigation: any) => (
	<Pressable
		key={item.id}
		onPress={() => {
			navigation.navigate('UserProfile', {
				user: item,
				index,
			});
		}}>
		{({ pressed }) => (
			<PostPreviewContainer>
				<ProfilePicPreview source={require('./pup.jpeg')} />
				<PreviewRight>
					<PreviewName>{item.username}</PreviewName>
					<Text>{formatPreview(item.latestPost.content[0])}</Text>
				</PreviewRight>
				{item.unreadPosts ? (
					<UnreadIndicator>
						<Text>🟢</Text>
					</UnreadIndicator>
				) : null}
			</PostPreviewContainer>
		)}
	</Pressable>
);

const Home = ({ navigation }: HomeProps) => {
	const { friends } = useContext(AppContext);

	return (
		<SafeAreaView style={{ backgroundColor: 'white' }}>
			<ScreenContainer>
				<Header>
					<Title>Home</Title>
					<IconsContainer>
						<Pressable
							onPressOut={() => navigation.navigate('Search')}>
							<Text>
								<Icon name='search' size={30} />
							</Text>
						</Pressable>
						<Text>
							<Icon name='settings' size={30} />
						</Text>
					</IconsContainer>
				</Header>
				<FeedList>
					<FlatList
						data={friends}
						renderItem={({
							item,
							index,
						}: {
							item: User;
							index: number;
						}) => renderFriendPreview(item, index, navigation)}
						keyExtractor={(item: User, index: number) =>
							item.id.toString()
						}
					/>
				</FeedList>
			</ScreenContainer>
		</SafeAreaView>
	);
};

export default Home;
