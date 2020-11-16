import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { FriendUser, Post, PostContent } from '../../types';

import formatPostTime from '../../utils/formatPostTime';
import { Heart } from '../../components/Icons/Heart';
import { Comment as CommentIcon } from '../../components/Icons/Comment';

const PostStyled = styled.View`
	padding: 5% 0%;
	border-bottom-width: 1px;
	border-bottom-color: #aaa;
`;

const OPHeader = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
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

const PostNumbersStyled = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 2%;
`;

const PostBottomStyled = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: 2%;
`;

const PostNumberText = styled.Text`
	margin-left: 3%;
	color: #333;
`;

type PostContainerProps = {
	post: Post;
	user: FriendUser;
};

const PostContainer = ({ user, post }: PostContainerProps) => {
	return (
		<PostStyled>
			<OPHeader>
				<OPProfilePicture source={require('../../Home/pup.jpg')} />
				<OPNamesContainer>
					<Text>{user.name}</Text>
					<Text>@{user.username}</Text>
				</OPNamesContainer>
			</OPHeader>
			<View>
				{post.content.map((c: PostContent) => (
					<Text key={post.id + '-' + c.index}>{c.content}</Text>
				))}
			</View>
			<PostBottomStyled>
				<PostNumbersStyled>
					<Heart isLiked={post.isLikedByUser} />
					<PostNumberText>{post.likeCount}</PostNumberText>
				</PostNumbersStyled>
				<PostNumbersStyled>
					<CommentIcon />
					<PostNumberText>{post.comments.length}</PostNumberText>
				</PostNumbersStyled>
				<PostNumbersStyled>
					<PostNumberText>
						— {formatPostTime(post.createdTime)}
					</PostNumberText>
				</PostNumbersStyled>
			</PostBottomStyled>
		</PostStyled>
	);
};

export default PostContainer;
