import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { Comment } from '../../types';
import SingleComment from './SingleComment';

const EmptyCommentsContainer = styled.View`
	margin-top: 5%;
	width: 100%;
`;

const EmptyCommentsText = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
	text-align: center;
`;

type CommentsContainerProps = {
	comments: Comment[];
};

const CommentsContainer = ({ comments }: CommentsContainerProps) => {
	if (!comments || !comments.length) {
		return (
			<EmptyCommentsContainer>
				<EmptyCommentsText>No comments...yet!</EmptyCommentsText>
			</EmptyCommentsContainer>
		);
	}

	return (
		<View>
			{comments.map((comment) => (
				<SingleComment key={comment.id} comment={comment} />
			))}
		</View>
	);
};

export default CommentsContainer;
