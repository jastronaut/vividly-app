import styled from 'styled-components/native';
import { ScreenContainer as SC } from '../styles';

export const HeaderColor = styled.View`
	width: 100%;
	height: 100px;
	background-color: rebeccapurple;
	top: -50px;
`;

export const ProfilePictureContainer = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ProfilePicture = styled.Image`
	border-radius: 50px;
	height: 100px;
	width: 100px;
	justify-content: center;
`;

export const ScreenContainer = styled(SC)`
	top: -50px;
	height: 100%;
	padding-top: 2%;
`;

export const UserInfoContainer = styled.View`
	top: -50px;
	border-bottom-color: #ddd;
	border-bottom-width: 3px;
	padding-bottom: 5%;
`;

export const Name = styled.Text`
	font-size: 20px;
	font-weight: bold;
`;

export const Username = styled.Text`
	color: #aaa;
	font-size: 20px;
	margin-left: 3%;
`;

export const NamesContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`;

export const PostContainer = styled.View`
	padding: 5% 5%;
	background: white;
	border-bottom-color: #eee;
	border-bottom-width: 2px;
	padding-bottom: 5%;
`;

export const UnreadBannerContainer = styled.View`
	top: -50px;
	display: flex;
	background-color: red;
	justify-content: center;
	align-items: center;
	padding: 2%;
`;

export const UnreadBannerText = styled.Text`
	color: white;
`;