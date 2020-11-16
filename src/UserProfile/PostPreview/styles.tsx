import React from 'react';
import styled from 'styled-components/native';

export const PostWrapper = styled.View`
	padding: 5% 3%;
	background: white;
	border-bottom-color: #eee;
	border-bottom-width: 2px;
	padding-bottom: 5%;
`;

export const PostContainer = styled.View<{ isPressed: boolean }>`
	padding-left: 1%;
	background: ${({ isPressed }) => (isPressed ? '#efefef' : 'white')};
`;

export const PostInteractionContainer = styled.View`
	padding-top: 4%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
`;
