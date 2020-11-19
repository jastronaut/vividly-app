import React, { useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';

import CommentsContainer from './Comments/CommentsContainer';
import PostContainer from './PostContainer';
import { PostPageProps } from '../Routes/interfaces';
import { FriendUser, Post } from '../types';
import { ScreenContainer } from '../styles';
import AddComment from './Comments/AddComment';
import { KeyboardAvoidingViewStyled, ScrollViewStyled } from './styles';

const PostPage = ({ navigation, route }: PostPageProps) => {
	const [user, setUser] = useState<FriendUser>(route.params.user);
	const [post, setPost] = useState<Post>(route.params.post);

	return (
		<>
			<KeyboardAvoidingViewStyled
				keyboardVerticalOffset={0}
				behavior='height'>
				<ScrollViewStyled
					contentContainerStyle={{ justifyContent: 'space-between' }}>
					<PostContainer user={user} post={post} />
					<CommentsContainer comments={post.comments} />
				</ScrollViewStyled>
				<AddComment />
			</KeyboardAvoidingViewStyled>
		</>
	);
};

export default PostPage;
