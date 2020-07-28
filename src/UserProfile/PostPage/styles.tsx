import React from 'react';
import styled from 'styled-components/native';

export const PostContainer = styled.View`
	padding: 5% 0%;
`;

export const OPHeader = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export const OPNamesContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: center;
    padding-left: 5%;
`;

export const ProfilePicture = styled.Image`
	border-radius: 50px;
	height: 100px;
	width: 100px;
`;

export const OPProfilePicture = styled.Image`
    border-radius: 38px;
	height: 75px;
	width: 75px;
`;
