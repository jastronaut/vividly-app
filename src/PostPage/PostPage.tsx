import React, { useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import CommentsContainer from './Comments/CommentsContainer';
import PostContainer from './PostContainer';
import { PostPageProps } from '../Routes/interfaces';
import { FriendUser, Post } from '../types';
import AddComment from './Comments/AddComment';
import { KeyboardAvoidingViewStyled, ScrollViewStyled } from './styles';
import ScreenLoadingIndicator from '../components/ScreenLoadingIndicator';
import { ProfileContext } from '../UserProfile/ProfileProvider';
import { AuthContext } from '../AuthProvider';

const ACTION_SHEET_OPTIONS = {
	options: ['Delete comment', 'Cancel'],
	destructiveButtonIndex: 0,
	cancelButtonIndex: 1,
};

const PostPage = ({ navigation, route }: PostPageProps) => {
	const { authUser } = useContext(AuthContext).authState;
	const { showActionSheetWithOptions } = useActionSheet();
	const { deleteComment } = useContext(ProfileContext);
	const { posts } = useContext(ProfileContext).state;
	const [user, setUser] = useState<FriendUser>(route.params.user);
	const [post, setPost] = useState<Post | null>(null);
	const [newComment, setNewComment] = useState<string>('');

	const onPressComment = (commentUsername: string) => {
		const username = '@' + commentUsername + ' ';
		if (newComment.length > 0) {
			setNewComment((comment) =>
				comment.indexOf(username) >= 0
					? comment
					: comment + ' ' + username,
			);
		} else {
			setNewComment('@' + commentUsername + ' ');
		}
	};

	const onLongPress = (commentId: string, authorId: string) => {
		if (authorId !== authUser!.id) return;
		showActionSheetWithOptions(ACTION_SHEET_OPTIONS, (buttonIndex) => {
			if (buttonIndex !== 0) return;
			deleteComment('jwt', post!.id, commentId);
		});
	};

	useEffect(() => {
		if (route.params.fromPage === 'profile') {
			navigation.setOptions({
				headerBackTitle: 'Back',
			});
		} else if (route.params.fromPage === 'notifications') {
			navigation.setOptions({
				headerBackTitle: 'Notifications',
			});
		}
	}, [route.params.fromPage]);

	useEffect(() => {
		const findPost = posts.filter((p) => p.id === route.params.postId);
		if (findPost.length < 1) return; // TODO: real error handling
		setPost(findPost[0]);
	}, [route.params.postId]);

	if (!post) return <ScreenLoadingIndicator />;

	return (
		<>
			<KeyboardAvoidingViewStyled
				keyboardVerticalOffset={0}
				behavior='height'>
				<ScrollViewStyled
					scrollIndicatorInsets={{ right: 1 }}
					contentContainerStyle={{
						justifyContent: 'space-between',
					}}>
					<PostContainer user={user} post={post} />
					<CommentsContainer
						comments={post.comments}
						onPressComment={onPressComment}
						onLongPress={onLongPress}
					/>
				</ScrollViewStyled>
				<AddComment
					newComment={newComment}
					setNewComment={setNewComment}
					postId={post.id}
				/>
			</KeyboardAvoidingViewStyled>
		</>
	);
};

export default PostPage;
