import styled from 'styled-components/native';



export const Header = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const IconsContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 25%;
`;

export const FeedList = styled.View`
	margin: 5% 2%;
`;

export const PostPreviewContainer = styled.View`
	border-bottom-width: 2px;
	border-bottom-color: #ddd;
	border-style: solid;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 2% 0;
`;

export const ProfilePicPreview = styled.Image`
	border-radius: 50px;
	width: 75px;
	height: 75px;
`;

export const PreviewRight = styled.View`
	padding-left: 5%;
	display: flex;
	flex-grow: 1;

`;

export const PreviewName = styled.Text`
	font-size: 15px;
	font-weight: bold;
`;

export const UnreadIndicator = styled.View`
	padding-left: 5%;
`;