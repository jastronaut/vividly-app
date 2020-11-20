import React from 'react';
import styled from 'styled-components/native';

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
	background-color: ${({ theme }) => theme.colors.main.bg};
`;

export const ScrollViewStyled = styled.ScrollView`
	height: 100%;
`;

export const DisplayName = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
`;

export const Username = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
`;

export const TextMain = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
`;
