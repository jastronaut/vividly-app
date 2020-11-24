import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import {
	Text,
	View,
	TextInput,
	Dimensions,
} from 'react-native';

import Button from '../../components/Button';
import CommentsContainer from './CommentsContainer';

const Container = styled.View<{ isInputFocused: boolean }>`
	position: absolute;
	bottom: ${({ isInputFocused }) => (isInputFocused ? '90px' : '20px')};
	width: ${Dimensions.get('screen').width}px;
	background-color: ${({ theme }) => theme.colors.main.bg};
	display: flex;
	padding: 2% 5% 3%;
	flex-direction: row;
	justify-content: space-between;
	max-height: ${Dimensions.get('screen').height / 4}px;
	border-top-width: 1px;
	border-top-color: ${({ theme }) => theme.colors.border};
`;

const ButtonStyled = styled(Button)`
	width: 100%;
	padding: 0px;
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

const AddComment = () => {
	const [newComment, setNewComment] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

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
				<ButtonStyled>
					<Text>Post</Text>
				</ButtonStyled>
			</ButtonWrapper>
		</Container>
	);
};

export default AddComment;
