import { StackScreenProps } from '@react-navigation/stack';

import { FriendUser, BaseUser, Post } from '../types';

// routes
type HomeStackParamList = {
	Home: undefined;
	UserProfile: {
		user: FriendUser;
		index: number;
	};
	PostPage: {
		postId: string;
		user: BaseUser;
		fromPage: string;
	};
	AppSettings: undefined;
	AuthUserProfile: undefined;
	AddPost: undefined;
};

export type UserProfileProps = StackScreenProps<
	HomeStackParamList,
	'UserProfile'
>;
export type PostPageProps = StackScreenProps<HomeStackParamList, 'PostPage'>;
export type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;
