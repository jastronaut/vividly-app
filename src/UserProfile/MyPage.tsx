import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, FlatList, Pressable, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

import ScreenLoadingIndicator from './ScreenLoadingIndicator';
import AppContext from '../AppContext';
import { User, UserProfileProps, Post } from '../interfaces';
import {
	HeaderColor,
	ProfilePicture,
	ProfilePictureContainer,
	ScreenContainer,
	UserInfoContainer,
	Name,
	Username,
	NamesContainer,
	PostContainer,
	PostInteractionContainer,
	PostWrapper,
	UserHeader,
} from './styles';
import { IconsContainer } from '../Home/styles';
// @ts-ignore
import LikedIcon from './assets/Liked.svg';
// @ts-ignore
import UnlikedIcon from './assets/Unliked.svg';
// @ts-ignore
import CommentsIcon from './assets/Comments.svg';

const createProfilePost = ({
	item,
	index,
	onPressPost,
}: {
	item: Post;
	index: number;
	onPressPost: any;
}) => {
	return (
		<PostWrapper>
			<Pressable onPressOut={() => onPressPost(item)}>
				<PostContainer key={item.id}>
					{item.content.map((c) => (
						<Text key={item.id}>{`${index}: ${c.content}`}</Text>
					))}
				</PostContainer>
			</Pressable>
			<PostInteractionContainer>
				{item.isLikedByCurUser ? (
					<LikedIcon height='100%' />
				) : (
					<UnlikedIcon height='100%' />
				)}
				<CommentsIcon height='100%' />
				<Text>{item.likeCount}</Text>
				<Text>{`  —  ${item.createdTime}`}</Text>
			</PostInteractionContainer>
		</PostWrapper>
	);
};

const MyPage = ({ navigation, route }: UserProfileProps) => {
	const { curUser } = useContext(AppContext);

	if (!curUser) navigation.navigate('Home');

	const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
	const [loadingError, setLoadingError] = useState<boolean>(false);
	const postListRef = useRef(null);

	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const loadPosts = async () => {
			setIsScreenLoading(true);
			try {
				const send = await fetch(
					`https://api.peached.club/v0/friends/feed/${curUser.id}`,
					{
						method: 'GET',
						headers: {
							'x-auth-token': curUser.jwtToken,
						},
					},
				);
				const resp = await send.json();
				console.log(resp);
			} catch (_e) {
				setLoadingError(true);
			}
			setIsScreenLoading(true);
		};
	}, []);

	const onPressPost = ({ post }: { post: Post }) => {
		const {
			id,
			name,
			username,
			profilePicture,
			unreadPosts,
			newestPost,
			bio,
		} = curUser;
		navigation.navigate('PostPage', {
			user: {
				id,
				name,
				username,
				profilePicture,
				unreadPosts,
				newestPost,
				bio,
			},
			post,
		});
	};

	return (
		<>
			{isScreenLoading ? <ScreenLoadingIndicator /> : null}

			<SafeAreaView style={{ backgroundColor: 'white' }}>
				<UserHeader>
					<UserInfoContainer>
						<ProfilePictureContainer>
							<ProfilePicture
								source={{ uri: curUser.profilePicture }}
							/>
						</ProfilePictureContainer>
						<NamesContainer>
							<Name>{curUser.name}</Name>
							<Username>@{curUser.username}</Username>
						</NamesContainer>
					</UserInfoContainer>
					<IconsContainer>
						<Pressable
							onPressOut={() => navigation.navigate('Search')}>
							<Text>
								<Icon name='settings' size={30} />
							</Text>
						</Pressable>
						<Text>
							<Icon name='info' size={30} />
						</Text>
						<Text>
							<Icon name='message-square' size={30} />
						</Text>
					</IconsContainer>
				</UserHeader>
				<ScreenContainer>
					<FlatList<Post>
						ref={postListRef}
						inverted={true}
						data={posts}
						renderItem={({
							item,
							index,
						}: {
							item: Post;
							index: number;
						}) => createProfilePost({ item, index, onPressPost })}
						keyExtractor={(post: Post) => post.id.toString()}
					/>
				</ScreenContainer>
			</SafeAreaView>
		</>
	);
};

export default MyPage;
