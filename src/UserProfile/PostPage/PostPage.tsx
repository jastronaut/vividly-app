import React, { useState } from 'react';
import { Text } from 'react-native';

import { User, PostPageProps, Post } from '../../interfaces';
import { ScreenContainer } from '../../styles';
import {
	PostContainer,
	OPHeader,
	OPNamesContainer,
	OPProfilePicture,
} from './styles';

const PostPage = ({ navigation, route }: PostPageProps) => {
	const [user, setUser] = useState<User>(route.params.user);
	const [post, setPost] = useState<Post>(route.params.post);

	const [comments, setComments] = useState();

	return (
		<ScreenContainer>
			<PostContainer>
				<OPHeader>
						<OPProfilePicture
							source={require('../../Home/pup.jpeg')}
						/>
						<OPNamesContainer>
							<Text>{user.name}</Text>
							<Text>@{user.username}</Text>
						</OPNamesContainer>
				</OPHeader>
				<Text>Test</Text>
			</PostContainer>
		</ScreenContainer>
	);
};

export default PostPage;
