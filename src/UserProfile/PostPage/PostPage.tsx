import React, { useState } from 'react';
import { Text, View } from 'react-native';

import CommentsContainer from './CommentsContainer';
import PostContainer from './PostContainer';
import { PostPageProps } from '../../Routes/interfaces';
import { FriendUser, Post } from '../../types';
import { ScreenContainer } from '../../styles';

const PostPage = ({ navigation, route }: PostPageProps) => {
	const [user, setUser] = useState<FriendUser>(route.params.user);
	const [post, setPost] = useState<Post>(route.params.post);

	return (
		<ScreenContainer>
			<PostContainer user={user} post={post} />
			<CommentsContainer comments={post.comments} />
		</ScreenContainer>
	);
};

export default PostPage;
