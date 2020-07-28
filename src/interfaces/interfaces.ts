import { StackScreenProps } from '@react-navigation/stack';

export interface User {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
	unreadPosts: number;
	latestPost: PostPreview;
	bio: string;
}

export interface PostPreview {
	id: string;
	content: PostContent[];
	updatedTime: number;
}

export interface Post extends PostPreview {
	likeCount: number;
	commentCount: 0;
	isUnread: boolean;
	createdTime: number;
	isLikedByCurUser: boolean;
}

export interface PostContent {
	type: string;
	content: string;
}

// routes
type HomeStackParamList = {
	Home: undefined;
	UserProfile: {
		user: User;
		index: number;
	};
	Search: undefined;
	PostPage: {
		post: Post;
		user: User;
	};
};

export type UserProfileProps = StackScreenProps<
	HomeStackParamList,
	'UserProfile'
>;
export type PostPageProps = StackScreenProps<HomeStackParamList, 'PostPage'>;
export type HomeProps = StackScreenProps<HomeStackParamList, 'Home'>;
