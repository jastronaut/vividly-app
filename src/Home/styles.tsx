import styled from 'styled-components/native';

export const FeedList = styled.View`
	margin: 5% 2%;
	height: 100%;
`;

export const PostPreviewContainer = styled.View<{ isPressed: boolean }>`
	border-bottom-width: 1px;
	border-bottom-color: ${({ theme }) => theme.colors.border};
	border-style: solid;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 5% 0;
	background-color: ${({ theme, isPressed }) =>
		isPressed ? theme.colors.muted.bg : theme.colors.main.bg};
`;

export const ProfilePicPreview = styled.Image`
	border-radius: 25px;
	width: 50px;
	height: 50px;
`;

export const PreviewText = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
`;

export const PreviewRight = styled.View`
	padding-left: 5%;
	display: flex;
	flex-grow: 1;
`;

export const PostPreviewContent = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const PreviewName = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.main.fg};
`;

export const StyledSAV = styled.SafeAreaView`
	background-color: ${({ theme }) => theme.colors.main.bg};
`;
