import React from 'react';
import styled from 'styled-components/native';

export const PostWrapper = styled.View<{ isPressed: boolean }>`
	padding: 5% 0%;
	background: ${({ theme, isPressed }) =>
		isPressed ? theme.colors.muted.bg : theme.colors.main.bg};
	padding-bottom: 5%;
`;

export const PostInteractionContainer = styled.View`
	padding: 0 4%;
	margin-top: 4%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;

export const PostText = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
	padding: 0% 4%;
`;

export const PostMetaText = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
	margin-right: 2%;
	margin-left: 1%;
`;

export const PostImage = styled.Image<{ height: number; width: number }>`
	height: ${({ height }) => height}px;
	width: 100%;
	padding: 0;
	margin: 0;
`;
