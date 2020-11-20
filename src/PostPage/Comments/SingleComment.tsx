import React from 'react';
import styled from 'styled-components/native';
import { Text, Pressable } from 'react-native';

import { Avatar, Username, DisplayName, TextMain } from '../styles';
import { Comment } from '../../types';
import formatPostTime from '../../utils/formatPostTime';

const CommentStyled = styled.View<{ isPressed: boolean }>`
	padding: 2% 4%;
	display: flex;
	flex-direction: row;
	width: 100%;
	background-color: ${({ isPressed, theme }) =>
		isPressed ? theme.colors.muted.bg : theme.colors.main.bg};
`;

const CommentContent = styled.View`
	margin: 0% 1%;
	padding: 1%;
	flex-basis: 100%;
`;

const AuthorNames = styled.View`
	display: flex;
	flex-direction: row;
	margin-bottom: 1%;
	width: 100%;
`;

const ContentContainer = styled.View`
	width: 90%;
`;

const Content = styled(TextMain)``;

const Time = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
`;

type Props = {
	comment: Comment;
};

const SingleComment = ({ comment }: Props) => {
	const { author } = comment;
	return (
		<Pressable>
			{({ pressed }) => (
				<CommentStyled isPressed={pressed}>
					<Pressable>
						<Avatar source={require('../../pup.jpg')} />
					</Pressable>
					<CommentContent>
						<AuthorNames>
							<DisplayName>{author.name}</DisplayName>
							<Username style={{ marginLeft: '2%' }}>
								@{author.username}
							</Username>
						</AuthorNames>

						<ContentContainer>
							<Content>{comment.content}</Content>
						</ContentContainer>
						<Time>{formatPostTime(comment.createdTime)}</Time>
					</CommentContent>
				</CommentStyled>
			)}
		</Pressable>
	);
};

export default SingleComment;
