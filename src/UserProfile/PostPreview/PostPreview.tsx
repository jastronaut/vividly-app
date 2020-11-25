import React, { useContext } from 'react';
import { View, Pressable } from 'react-native';

import { Post, PostContent } from '../../types';
import formatPostTime from '../../utils/formatPostTime';
import { ProfileContext } from '../ProfileProvider';

import {
	PostWrapper,
	PostInteractionContainer,
	PostText,
	PostMetaText,
	PostImage,
} from './styles';

import { Heart } from '../../components/Icons/Heart';
import { Comment } from '../../components/Icons/Comment';
import LinkText from '../../components/LinkText';

export const renderPostContent = (preview: PostContent) => {
	switch (preview.postType) {
		case 'link':
			return <LinkText key={preview.index} url={preview.content} />;
		case 'image':
			return (
				<PostImage
					key={preview.index}
					resizeMode='contain'
					height={preview.height}
					width={preview.width}
					source={{ uri: preview.content }}
				/>
			);
		default:
			return <PostText key={preview.index}>{preview.content}</PostText>;
	}
};

type PostPreviewProps = {
	post: Post;
	onPressPost: Function;
};

const PostPreview = ({ post, onPressPost }: PostPreviewProps) => {
	const { toggleLikePost } = useContext(ProfileContext);

	return (
		<Pressable onPress={() => onPressPost(post)}>
			{({ pressed }) => (
				<PostWrapper isPressed={pressed}>
					<View>{post.content.map((c) => renderPostContent(c))}</View>
					<PostInteractionContainer>
						<Pressable onPress={() => toggleLikePost('fakejwt', post.id) }>
						<Heart isLiked={post.isLikedByUser} />
						</Pressable>
						<PostMetaText>{post.likeCount}</PostMetaText>
						<Comment />
						<PostMetaText>{post.comments.length}</PostMetaText>
						<PostMetaText>—</PostMetaText>
						<PostMetaText>
							{formatPostTime(post.createdTime)}
						</PostMetaText>
					</PostInteractionContainer>
				</PostWrapper>
			)}
		</Pressable>
	);
};

export default PostPreview;
