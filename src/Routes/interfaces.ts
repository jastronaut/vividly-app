import { StackScreenProps } from '@react-navigation/stack';

import { FriendUser, Post } from '../types';

// routes
type HomeStackParamList = {
	Home: undefined;
	UserProfile: {
		user: FriendUser;
		index: number;
	};
	Search: undefined;
	PostPage: {
		post: Post;
		user: FriendUser;
	};
	AppSettings: undefined;
};

export type UserProfileProps = StackScreenProps<
	HomeStackParamList,
	'UserProfile'
>;
export type PostPageProps = StackScreenProps<HomeStackParamList, 'PostPage'>;
export type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;
