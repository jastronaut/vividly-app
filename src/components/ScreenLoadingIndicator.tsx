import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const LoadingContainer = styled.View`
	position: absolute;
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.main.bg};
	z-index: 1000;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default () => (
	<LoadingContainer>
		<ActivityIndicator size='large' />
	</LoadingContainer>
);
