import React, { RefObject } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Post } from '../types';
import PostPreview from './PostPreview';

export const DebugContainer = styled.View``;

const createProfilePost = ({
	item,
	index,
	onPressPost,
	onLongPressPost,
}: {
	item: Post;
	index: number;
	onPressPost: Function;
	onLongPressPost: Function;
}) =>
	item ? (
		<PostPreview
			post={item}
			onPressPost={onPressPost}
			onLongPressPost={onLongPressPost}
		/>
	) : null;

type PostsListProps = {
	postListRef: RefObject<FlatList>;
	isRefreshing: boolean | null;
	posts: Post[];
	onPressPost: Function;
	onLongPressPost: Function;
	onRefreshPage: (() => void) | null;
};

const PostsList = (props: PostsListProps) => {
	const {
		postListRef,
		isRefreshing,
		posts,
		onPressPost,
		onLongPressPost,
		onRefreshPage,
	} = props;

	return (
		<FlatList<Post>
			style={{ marginBottom: 40 }}
			ref={postListRef}
			inverted={true}
			refreshing={isRefreshing}
			data={posts}
			renderItem={({ item, index }: { item: Post; index: number }) =>
				createProfilePost({ item, index, onPressPost, onLongPressPost })
			}
			keyExtractor={(post: Post) => post.id.toString()}
			onRefresh={onRefreshPage}
		/>
	);
};

export default PostsList;
