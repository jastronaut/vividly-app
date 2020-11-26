import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Text, View, TextInput, Dimensions, Keyboard } from 'react-native';

import { ProfileContext } from '../../UserProfile/ProfileProvider';
import { AuthContext } from '../../AuthProvider';
import Button from '../../components/Button';
import CommentsContainer from './CommentsContainer';

const Container = styled.View<{ isInputFocused: boolean }>`
	position: absolute;
	min-height: 50px;
	bottom: ${({ isInputFocused }) => (isInputFocused ? '90px' : '0px')};
	width: ${Dimensions.get('screen').width}px;
	background-color: ${({ theme }) => theme.colors.main.bg};
	display: flex;
	padding: 2% 5% 8%;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	max-height: ${Dimensions.get('screen').height / 4}px;
	border-top-width: 1px;
	border-top-color: ${({ theme }) => theme.colors.border};
`;

const ButtonStyled = styled(Button)`
	width: 100%;
	padding: 2% 1%;
`;

const Input = styled.TextInput.attrs(({ theme }) => ({
	placeholderTextColor: theme.colors.muted.fg,
}))`
	border-radius: 5px;
	border: solid 1px ${({ theme }) => theme.colors.border};
	padding: 2% 1%;
	color: ${({ theme }) => theme.colors.main.fg};
`;

const InputWrapper = styled.View`
	flex-basis: 80%;
`;

const ButtonWrapper = styled.View`
	align-self: flex-start;
`;

type Props = {
	newComment: string;
	setNewComment: Function;
	postId: string;
};

const AddComment = ({ newComment, setNewComment, postId }: Props) => {
	const { addComment } = useContext(ProfileContext);
	const { authUser } = useContext(AuthContext).authState;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const onSubmit = () => {
		setIsLoading(true);
		Keyboard.dismiss();
		addComment('jwt', postId, newComment, authUser);
		setNewComment('');
		setIsLoading(false);
	};

	return (
		<Container isInputFocused={isInputFocused}>
			<InputWrapper>
				<Input
					onChangeText={(text) => setNewComment(text)}
					value={newComment}
					placeholder='Add a comment'
					autoCapitalize='none'
					editable={!isLoading}
					multiline
					onFocus={() => setIsInputFocused(true)}
					onBlur={() => setIsInputFocused(false)}
				/>
			</InputWrapper>
			<ButtonWrapper>
				<ButtonStyled
					disabled={newComment.trim().length < 1}
					onPress={() => onSubmit()}>
					<Text>Post</Text>
				</ButtonStyled>
			</ButtonWrapper>
		</Container>
	);
};

export default AddComment;
