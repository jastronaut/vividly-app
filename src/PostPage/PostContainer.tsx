import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text, View, Pressable } from 'react-native';

import { ProfileContext } from '../UserProfile/ProfileProvider';
import { FriendUser, Post, PostContent } from '../types';
import {
	PostInteractionContainer,
	PostMetaText,
} from '../UserProfile/PostPreview/styles';
import { Username, DisplayName, Avatar } from './styles';
import formatPostTime from '../utils/formatPostTime';
import { Heart } from '../components/Icons/Heart';
import { Comment } from '../components/Icons/Comment';
import { renderPostContent } from '../UserProfile/PostPreview/PostPreview';

const PostStyled = styled.View`
	padding: 5% 0;
	border-bottom-width: 1px;
	border-bottom-color: #aaa;
`;

const OPHeader = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-bottom: 2%;
`;

const OPNamesContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 2%;
`;

type PostContainerProps = {
	post: Post;
	user: FriendUser;
};

const PostContainer = ({ user, post }: PostContainerProps) => {
	const { toggleLikePost } = useContext(ProfileContext);

	return (
		<PostStyled>
			<OPHeader>
				<Avatar source={require('../Home/pup.jpg')} />
				<OPNamesContainer>
					<DisplayName>{user.name}</DisplayName>
					<Username>@{user.username}</Username>
				</OPNamesContainer>
			</OPHeader>
			<View>
				{post.content.map((c: PostContent) => renderPostContent(c))}
			</View>
			<PostInteractionContainer>
				<Pressable onPress={() => toggleLikePost('fakejwt', post.id)}>
					<Heart isLiked={post.isLikedByUser} />
				</Pressable>
				<PostMetaText>{post.likeCount}</PostMetaText>
				<Comment />
				<PostMetaText>{post.comments.length}</PostMetaText>
				<PostMetaText>—</PostMetaText>
				<PostMetaText>{formatPostTime(post.createdTime)}</PostMetaText>
			</PostInteractionContainer>
		</PostStyled>
	);
};

export default PostContainer;
