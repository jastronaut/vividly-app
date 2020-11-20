import React from 'react';
import styled from 'styled-components/native';

export const PostWrapper = styled.View`
	padding: 5% 3%;
	background: ${({ theme }) => theme.colors.main.bg};
	border-bottom-color: ${({ theme }) => theme.colors.border};
	border-bottom-width: 2px;
	padding-bottom: 5%;
`;

export const PostContainer = styled.View<{ isPressed: boolean }>`
	padding-left: 1%;
	background: ${({ isPressed, theme }) =>
		isPressed ? theme.colors.muted.bg : theme.colors.main.bg};
`;

export const PostInteractionContainer = styled.View`
	padding-top: 4%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;

export const PostText = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
`;

export const PostMetaText = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
	margin-right: 2%;
	margin-left: 1%;
`;
