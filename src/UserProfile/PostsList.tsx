import React, { RefObject } from 'react';
import styled from 'styled-components/native';
import { FlatList, View, Text } from 'react-native';

import { Post } from '../types';
import PostPreview from './PostPreview';

export const DebugContainer = styled.View``;

type PostsListProps = {
	postListRef: RefObject<FlatList>;
	isRefreshing: boolean | null;
	posts: Post[];
	onPressPost: Function;
	onLongPressPost: Function;
	onRefreshPage: (() => void) | null;
	onEndReached: () => void;
};

const PostsList = (props: PostsListProps) => {
	const {
		postListRef,
		isRefreshing,
		posts,
		onPressPost,
		onLongPressPost,
		onRefreshPage,
		onEndReached,
	} = props;

	return (
		<FlatList<Post>
			style={{ marginBottom: 40 }}
			ref={postListRef}
			inverted={true}
			refreshing={isRefreshing}
			data={posts}
			renderItem={({ item, index }: { item: Post; index: number }) => (
				<PostPreview
					key={item.id}
					post={item}
					onPressPost={onPressPost}
					onLongPressPost={onLongPressPost}
				/>
			)}
			keyExtractor={(post: Post) => post.id}
			onRefresh={onRefreshPage}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.05}
			initialNumToRender={30}
		/>
	);
};

export default PostsList;
