import React from 'react';
import styled from 'styled-components/native';
import { Pressable, Text, View } from 'react-native';

import { Comment } from '../../types';
import SingleComment from './SingleComment';

const EmptyCommentsContainer = styled.View`
	margin-top: 5%;
	width: 100%;
`;

const EmptyCommentsText = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
	text-align: center;
	margin-bottom: 20%;
`;

type CommentsContainerProps = {
	comments: Comment[];
	onPressComment: Function;
	onLongPress: Function;
};

const CommentsContainer = ({
	comments,
	onPressComment,
	onLongPress,
}: CommentsContainerProps) => {
	if (!comments || !comments.length) {
		return (
			<EmptyCommentsContainer>
				<EmptyCommentsText>No comments...yet!</EmptyCommentsText>
			</EmptyCommentsContainer>
		);
	}

	return (
		<View style={{ marginBottom: '20%' }}>
			{comments.map((comment) => (
				<SingleComment
					key={comment.id}
					comment={comment}
					onPress={onPressComment}
					onLongPress={onLongPress}
				/>
			))}
		</View>
	);
};

export default CommentsContainer;
