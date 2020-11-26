import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import styled from 'styled-components/native';

const UploadedImagesContainer = styled.View`
	display: flex;
	flex-direction: row;
	padding-top: 2%;
`;

const UploadedImagePreview = styled.Image<{ isPressed: boolean }>`
	width: 100px;
	height: 100px;
	opacity: ${({ isPressed }) => (isPressed ? '0.5' : '1')};
`;

export type ImageUpload = {
	data: string;
	uri: string;
	width: number;
	height: number;
};

type Props = {
	postImages: ImageUpload[];
	removeUploadedImageByUri: Function;
};

const ACTION_SHEET_OPTIONS = {
	options: ['Remove', 'Cancel'],
	destructiveButtonIndex: 0,
	cancelButtonIndex: 1,
};

const UploadedImagePreviews = ({
	postImages,
	removeUploadedImageByUri,
}: Props) => {
	if (!postImages.length) return null;

	const { showActionSheetWithOptions } = useActionSheet();
	return (
		<UploadedImagesContainer>
			<FlatList<ImageUpload>
				horizontal
				data={postImages}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => {
							showActionSheetWithOptions(
								ACTION_SHEET_OPTIONS,
								(buttonIndex) => {
									if (buttonIndex !== 0) return;
									removeUploadedImageByUri(item.uri);
								},
							);
						}}>
						{({ pressed }) => (
							<UploadedImagePreview
								isPressed={pressed}
								source={{ uri: item.uri }}
							/>
						)}
					</Pressable>
				)}
				keyExtractor={(item) => item.uri}
			/>
		</UploadedImagesContainer>
	);
};

export default UploadedImagePreviews;
