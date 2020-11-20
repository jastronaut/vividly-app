import styled from 'styled-components/native';

export const FeedList = styled.View`
	margin: 5% 2%;
`;

export const PostPreviewContainer = styled.View`
	border-bottom-width: 2px;
	border-bottom-color: ${({ theme }) => theme.colors.border};
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

export const PreviewText = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
`;

export const PreviewRight = styled.View`
	padding-left: 5%;
	display: flex;
	flex-grow: 1;
`;

export const PreviewName = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.main.fg};
`;

export const UnreadIndicator = styled.View`
	padding-left: 5%;
`;

export const StyledSAV = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.main.bg};
`;
