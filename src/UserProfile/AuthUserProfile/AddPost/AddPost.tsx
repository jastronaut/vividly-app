import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
	View,
	Dimensions,
	Text,
	KeyboardAvoidingView,
	Keyboard,
	Alert,
	Pressable,
} from 'react-native';
import {
	HeaderBackButton,
	StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';

import ProfileProvider, { ProfileContext } from '../../ProfileProvider';
import { POST_TYPE, TextPost, ImagePost, PostContent } from '../../../types';
import Button from '../../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import ImageThumbnail from '../../../components/Icons/ImageThumbnail';
import UploadedImagePreviews, { ImageUpload } from './UploadedImagePreviews';

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
	padding: 2% 1% 0%;
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
`;

const PostActionsButtons = styled.View`
	display: flex;
	justify-content: center;
	height: 50px;
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
			{
				text: 'Exit',
				onPress: () => exitAddPost(),
				style: 'destructive',
			},
		],
		{ cancelable: false },
	);

const AddPostComponent = () => {
	const navigation = useNavigation();
	const { addPost } = useContext(ProfileContext);

	const [newPostText, setNewPostText] = useState<string>('');
	const [postImages, setPostImages] = useState<ImageUpload[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const removeUploadedImageByUri = (uri: string) => {
		setPostImages((postImages) =>
			postImages.filter((img) => img.uri !== uri),
		);
	};

	const createPost = useCallback(() => {
		setIsLoading(true);
		Keyboard.dismiss();
		if (newPostText.trim().length < 1 && postImages.length < 1) return;
		let postContent: PostContent[] = [];
		let postContentIndex = 0; // i shouldn't be doing this here
		if (newPostText.trim().length) {
			postContent.push({
				index: postContentIndex,
				postType: POST_TYPE.text,
				content: newPostText,
			});
			postContentIndex++;
		}
		if (postImages.length) {
			const postImagesContent = postImages.map((imgData) => {
				const imgObj = {
					index: postContentIndex,
					postType: POST_TYPE.image,
					content: imgData.uri,
					width: imgData.width,
					height: imgData.height,
				};
				postContentIndex++;
				return imgObj;
			});
			postContent = postContent.concat(postImagesContent);
		}
		addPost(postContent);
		// TODO: error handling here :)
		setIsLoading(false);
		navigation.navigate('AuthUserProfile');
	}, [newPostText, postImages]);

	const exitAddPost = () => navigation.goBack();

	const onPressPhotoPicker = () => {
		ImagePicker.launchImageLibrary(
			{
				mediaType: 'photo',
				maxWidth: 1200,
				maxHeight: 2400,
				quality: 0.8,
			},
			(resp) => {
				if (resp.didCancel) return;
				if (resp.error) {
					console.log(resp.error);
					return;
				}
				setPostImages((postImages) =>
					postImages.concat([
						{
							data: resp.data,
							uri: resp.uri,
							width: resp.width,
							height: resp.height,
						},
					]),
				);
			},
		);
	};

	useEffect(() => {
		navigation.setOptions({
			headerLeft: (props: StackHeaderLeftButtonProps) => (
				<HeaderBackButton
					{...props}
					onPress={() => {
						newPostText.trim().length > 0 || postImages.length > 0
							? exitPostConfirmation(exitAddPost)
							: exitAddPost();
					}}
				/>
			),
			headerRight: () => (
				<Button
					onPress={() => createPost()}
					disabled={
						newPostText.trim().length < 1 && postImages.length < 1
					}>
					<Text>Post</Text>
				</Button>
			),
		});
	}, [newPostText, postImages, addPost]);

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
				<UploadedImagePreviews
					postImages={postImages}
					removeUploadedImageByUri={removeUploadedImageByUri}
				/>
				<PostActionsButtons>
					<Pressable onPress={onPressPhotoPicker}>
						<ImageThumbnail />
					</Pressable>
				</PostActionsButtons>
			</PostActionsContainer>
		</KeyboardAvoidingViewStyled>
	);
};

const AddPost = () => {
	return <AddPostComponent />;
};

export default AddPost;
