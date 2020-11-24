import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Dimensions,
	Text,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import ImageThumbnail from '../../components/Icons/ImageThumbnail';

const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.muted.bg};
	margin-top: 2%;
	padding: 0% 5% 3%;
	min-height: 50%;
	max-height: 90%;
`;

const Input = styled.TextInput.attrs(({ theme }) => ({
	placeholderTextColor: theme.colors.muted.fg,
}))`
	border-radius: 5px;
	padding: 2% 1%;
	color: ${({ theme }) => theme.colors.main.fg};
	border: none;
	height: 100%;
`;

const PostActionsContainer = styled.View<{ isInputFocused: boolean }>`
	position: absolute;
	bottom: ${({ isInputFocused }) => (isInputFocused ? '90px' : '20px')};
	width: ${Dimensions.get('screen').width}px;
	background-color: ${({ theme }) => theme.colors.muted.bg};
	padding: 0% 3%;
	height: 50px;
	display: flex;
	justify-content: center;
`;

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
	background-color: ${({ theme }) => theme.colors.main.bg};
`;

export const ScrollViewStyled = styled.ScrollView`
	height: 100%;
`;

const exitPostConfirmation = (exitAddPost: Function) =>
	Alert.alert(
		'Exit new post?',
		'If you leave, your post will not be saved.',
		[
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'Exit', onPress: () => exitAddPost() },
		],
		{ cancelable: false },
	);

const AddPost = () => {
	const navigation = useNavigation();

	const [newPostText, setNewPostText] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const addPost = useCallback(() => {
		console.log('new post text ->', newPostText, '<-');
	}, [newPostText]);

	const exitAddPost = () => navigation.goBack();

	useEffect(() => {
		navigation.setOptions({
			headerLeft: (props) => (
				<HeaderBackButton
					{...props}
					onPress={() => {
						newPostText.length > 0
							? exitPostConfirmation(exitAddPost)
							: exitAddPost();
					}}
				/>
			),
			headerRight: () => (
				<Button
					onPress={() => addPost()}
					disabled={newPostText.length < 1}>
					<Text>Post</Text>
				</Button>
			),
		});
	}, [newPostText]);

	return (
		<KeyboardAvoidingViewStyled
			keyboardVerticalOffset={0}
			behavior='height'>
			<ScrollViewStyled>
				<Container>
					<Input
						onChangeText={(text) => setNewPostText(text)}
						value={newPostText}
						placeholder="What's going on?"
						autoCapitalize='none'
						editable={!isLoading}
						multiline
						onFocus={() => setIsInputFocused(true)}
						onBlur={() => setIsInputFocused(false)}
					/>
				</Container>
			</ScrollViewStyled>
			<PostActionsContainer isInputFocused={isInputFocused}>
				<ImageThumbnail />
			</PostActionsContainer>
		</KeyboardAvoidingViewStyled>
	);
};

export default AddPost;
