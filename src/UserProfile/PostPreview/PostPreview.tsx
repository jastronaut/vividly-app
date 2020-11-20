import React from 'react';
import { Text, Pressable } from 'react-native';

import { Post, PostContent } from '../../types';
import formatPostTime from '../../utils/formatPostTime';

import {
	PostWrapper,
	PostContainer,
	PostInteractionContainer,
	PostText,
	PostMetaText,
} from './styles';

import { Heart } from '../../components/Icons/Heart';
import { Comment } from '../../components/Icons/Comment';

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
							<PostText key={post.id + '-' + c.index}>
								{c.content}
							</PostText>
						))}
					</PostContainer>
				)}
			</Pressable>
			<PostInteractionContainer>
				<Heart isLiked={post.isLikedByUser} />
				<PostMetaText>{post.likeCount}</PostMetaText>
				<Comment />
				<PostMetaText>{post.comments.length}</PostMetaText>
				<PostMetaText>—</PostMetaText>
				<PostMetaText>{formatPostTime(post.createdTime)}</PostMetaText>
			</PostInteractionContainer>
		</PostWrapper>
	);
};

export default PostPreview;
