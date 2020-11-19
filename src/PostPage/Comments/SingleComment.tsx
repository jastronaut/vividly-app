import React from 'react';
import { Text, View } from 'react-native';
import { Comment, CommentUser } from '../../types';

import formatPostTime from '../../utils/formatPostTime';

type Props = {
	comment: Comment;
};

const SingleComment = ({ comment }: Props) => {
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

export default SingleComment;
