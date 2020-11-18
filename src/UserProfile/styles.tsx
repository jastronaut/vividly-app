import styled from 'styled-components/native';
import { ScreenContainer as SC } from '../styles';

export const HeaderColor = styled.View`
	width: 100%;
	height: 100px;
	background-color: rebeccapurple;
`;

export const ScreenContainer = styled(SC)`
	height: 100%;
	padding-top: 2%;
`;

export const UserHeader = styled.View`
	width: 100%;
	justify-content: space-between;
	display: flex;
	flex-direction: row;
	border-bottom-color: #ddd;
	border-bottom-width: 3px;
	padding: 0 5% 2%;
	align-items: center;
`;
