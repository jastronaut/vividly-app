import React from 'react';
import { Pressable } from 'react-native';

import {
	ProfilePicPreview,
	PostPreviewContainer,
	PreviewRight,
	PreviewName,
	PreviewText,
	PostPreviewContent,
} from './styles';
import { FeedPreview, PostContent } from '../types';
import formatPostTime from '../utils/formatPostTime';

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

export type FeedPreviewComponentProps = {
	feedPreview: FeedPreview;
	index: number;
	onPress: Function;
};

const FeedPreviewComponent = ({
	feedPreview,
	index,
	onPress,
}: FeedPreviewComponentProps) => (
	// TODO: favorites indicator
	<Pressable onPress={() => onPress(feedPreview.user, index)}>
		{({ pressed }) => (
			<PostPreviewContainer isPressed={pressed}>
				<ProfilePicPreview source={require('./pup.jpg')} />
				<PreviewRight>
					<PreviewName>{feedPreview.user.name}</PreviewName>
					{feedPreview.newestPost ? (
						<PostPreviewContent>
							<PreviewText>
								{feedPreview.user.unreadPosts ? '🟢 ' : ''}
								{formatPreview(feedPreview.newestPost.content)}
							</PreviewText>
							<PreviewText>
								{feedPreview.newestPost &&
									formatPostTime(
										feedPreview.newestPost.createdTime,
									)}
							</PreviewText>
						</PostPreviewContent>
					) : null}
				</PreviewRight>
			</PostPreviewContainer>
		)}
	</Pressable>
);

export default FeedPreviewComponent;
