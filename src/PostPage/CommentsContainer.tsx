import React from 'react';
import styled from 'styled-components/native';
import { Text, View, FlatList } from 'react-native';

import formatPostTime from '../utils/formatPostTime';
import { Comment, CommentUser } from '../types';

type SingleCommentProps = {
	comment: Comment;
};

const SingleComment = ({ comment }: SingleCommentProps) => {
	const { author } = comment;
	return (
		<View>
			<Text>
				Author: {author.name} @{author.username}
			</Text>
			<Text>Content: {comment.content}</Text>
			<Text>Time: {formatPostTime(comment.createdTime)}</Text>
		</View>
	);
};

const createComment = ({ item, index }: { item: Comment; index: number }) =>
	item ? <SingleComment comment={item} /> : null;

type CommentsContainerProps = {
	comments: Comment[];
};

const CommentsContainer = ({ comments }: CommentsContainerProps) => {
	if (!comments || !comments.length) {
		return (
			<View>
				<Text>No comments...yet!</Text>
			</View>
		);
	}

	return (
		<View>
			<FlatList<Comment>
				inverted={true}
				data={comments}
				renderItem={({
					item,
					index,
				}: {
					item: Comment;
					index: number;
				}) => createComment({ item, index })}
				keyExtractor={(comment: Comment) => comment.id}
			/>
		</View>
	);
};

export default CommentsContainer;
