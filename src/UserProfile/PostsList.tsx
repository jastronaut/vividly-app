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
}: {
	item: Post;
	index: number;
	onPressPost: Function;
}) => (item ? <PostPreview post={item} onPressPost={onPressPost} /> : null);

type PostsListProps = {
	postListRef: RefObject<FlatList>;
	isRefreshing: boolean | null;
	posts: Post[];
	onPressPost: Function;
	onRefreshPage: (() => void) | null;
};

const PostsList = (props: PostsListProps) => {
	const {
		postListRef,
		isRefreshing,
		posts,
		onPressPost,
		onRefreshPage,
	} = props;

	return (
		<DebugContainer>
			<FlatList<Post>
				style={{
					height: '80%',
				}}
				ref={postListRef}
				inverted={true}
				refreshing={isRefreshing}
				data={posts}
				renderItem={({ item, index }: { item: Post; index: number }) =>
					createProfilePost({ item, index, onPressPost })
				}
				keyExtractor={(post: Post) => post.id.toString()}
				onRefresh={onRefreshPage}
			/>
		</DebugContainer>
	);
};

export default PostsList;
