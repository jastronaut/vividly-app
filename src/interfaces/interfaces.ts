import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export interface User {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
	unreadPosts: number;
	latestPost: PostPreview;
	bio: String;
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
type TabsStackParamList = {
	Home: undefined;
	UserProfile: {
		user: User;
		index: number;
	}
}

export type UserProfileProps = BottomTabScreenProps<TabsStackParamList, 'UserProfile'>;

export type HomeProps = BottomTabScreenProps<TabsStackParamList, 'Home'>;
