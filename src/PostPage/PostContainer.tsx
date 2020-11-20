import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { FriendUser, Post, PostContent } from '../types';
import {
	PostInteractionContainer,
	PostMetaText,
} from '../UserProfile/PostPreview/styles';
import { Username, DisplayName, TextMain } from './styles';
import formatPostTime from '../utils/formatPostTime';
import { Heart } from '../components/Icons/Heart';
import { Comment } from '../components/Icons/Comment';

const PostStyled = styled.View`
	padding: 5% 4%;
	border-bottom-width: 1px;
	border-bottom-color: #aaa;
`;

const OPHeader = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-bottom: 5%;
`;

const OPNamesContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 5%;
`;

const OPProfilePicture = styled.Image`
	border-radius: 25px;
	height: 50px;
	width: 50px;
`;

type PostContainerProps = {
	post: Post;
	user: FriendUser;
};

const PostContainer = ({ user, post }: PostContainerProps) => {
	return (
		<PostStyled>
			<OPHeader>
				<OPProfilePicture source={require('../Home/pup.jpg')} />
				<OPNamesContainer>
					<DisplayName>{user.name}</DisplayName>
					<Username>@{user.username}</Username>
				</OPNamesContainer>
			</OPHeader>
			<View>
				{post.content.map((c: PostContent) => (
					<TextMain key={post.id + '-' + c.index}>
						{c.content}
					</TextMain>
				))}
			</View>
			<PostInteractionContainer>
				<Heart isLiked={post.isLikedByUser} />
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
