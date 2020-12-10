import React, { useContext } from 'react';
import { Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { FeedContext } from '../FeedProvider';
import { ProfileContext } from '../UserProfile/ProfileProvider';
import Smile from '../components/Icons/Smile';

const ACTION_SHEET_OPTIONS = {
	options: ['Unfriend', 'Cancel'],
	destructiveButtonIndex: 0,
	cancelButtonIndex: 1,
};

export default () => {
	const navigation = useNavigation();
	const { removeFeed } = useContext(FeedContext);
	const { clearPosts } = useContext(ProfileContext);
	const { showActionSheetWithOptions } = useActionSheet();

	const onPress = () => {
		showActionSheetWithOptions(ACTION_SHEET_OPTIONS, (buttonIndex) => {
			if (buttonIndex !== 0) return;
			Alert.alert(
				'Unfriend?',
				'If you leave, your post will not be saved.',
				[
					{
						text: 'Cancel',
						onPress: () => null,
						style: 'cancel',
					},
					{
						text: 'Unfriend',
						onPress: () => {
							clearPosts();
							removeFeed();
							navigation.navigate('Home');
						},
						style: 'destructive',
					},
				],
				{ cancelable: false },
			);
		});
	};

	return (
		<Pressable onPress={onPress} style={{ marginRight: 10 }}>
			<Smile width={30} height={30} />
		</Pressable>
	);
};
