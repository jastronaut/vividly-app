import React from 'react';
import { Text, Pressable } from 'react-native';

import { Post, PostContent } from '../../types';
import formatPostTime from '../../utils/formatPostTime';

import { PostWrapper, PostContainer, PostInteractionContainer } from './styles';

import LikedIcon from './assets/Liked.svg';
import UnlikedIcon from './assets/Unliked.svg';
import CommentsIcon from './assets/Comments.svg';

type PostPreviewProps = {
	post: Post;
	onPressPost: Function;
};

const PostPreview = ({ post, onPressPost }: PostPreviewProps) => {
	console.log(post.id);
	return (
		<PostWrapper>
			<Pressable onPress={() => onPressPost(post)}>
				{({ pressed }) => (
					<PostContainer key={post.id} isPressed={pressed}>
						{post.content.map((c: PostContent) => (
							<Text key={post.id + '-' + c.index}>
								{c.content}
							</Text>
						))}
					</PostContainer>
				)}
			</Pressable>
			<PostInteractionContainer>
				{post.isLikedByUser ? (
					<LikedIcon height='100%' />
				) : (
					<UnlikedIcon height='100%' />
				)}
				<Text>{post.likeCount}</Text>
				<CommentsIcon height='100%' />
				<Text>{post.comments.length}</Text>
				<Text>{`  —  ${formatPostTime(post.createdTime)}`}</Text>
			</PostInteractionContainer>
		</PostWrapper>
	);
};

export default PostPreview;
