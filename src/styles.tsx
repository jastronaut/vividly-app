import styled from 'styled-components/native';

export const Title = styled.Text`
	font-size: 40px;
	font-weight: bold;
`;

export const ScreenContainer = styled.View`
	padding: 0 5%;
	background-color: ${({ theme }) => theme.colors.main.bg};
	height: 100%;
`;
