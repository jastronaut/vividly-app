enum FriendType {
	pending = 'pending',
	outgoing = 'outgoing',
	friends = 'friends',
}

export interface Friend {
	friendId: string;
	friendType: FriendType;
	lastReadPostTime: Date | null;
}

export interface User {
	id: string;
	name: string;
	username: string;
	profilePicture: string;
	unreadPosts: number;
	newestPost: PostPreview | null;
	bio: string;
}

export interface CurUser extends User {
	email: string;
	emailVerified: boolean;
	friends: FriendType[];
	blockedWords: string[];
	jwtToken: string;
}

export interface PostPreview {
	id: string;
	content: string;
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

export interface Comment {
	id: string;
	body: string;
	author: User;
}
