export interface BaseUser {
	id: string;
	name: string;
	username: string;
	bio: string;
	profilePicture: string;
}

export enum FRIEND_TYPE {
	accepted = 'friends',
	pending = 'pending',
	outgoing = 'outgoing',
}

export interface Friend {
	friendId: string;
	lastReadPostTime: string | null;
	friendType: FRIEND_TYPE;
}

export interface CommentUser extends BaseUser {
	isFriendsWithAuthUser: boolean;
}

export interface AuthUser extends BaseUser {
	emailVerified: boolean;
	email: string;
	blockedWords: string[];
	friends: Friend[];
}

export interface User extends BaseUser {
	isFavorite: boolean;
}

export interface FriendUser extends BaseUser {
	isFavorite: boolean;
	unreadPosts: number;
}

export enum POST_TYPE {
	text = 'text',
	image = 'image',
	link = 'link',
}

export interface BasePost {
	id: string;
	createdTime: string;
}

export interface PostPreview extends BasePost {
	content: PostContent;
}

export interface Post extends BasePost {
	isUpdated: boolean;
	likeCount: number;
	isLikedByUser: boolean;
	comments: Comment[];
	content: PostContent[];
}

export interface PostContent {
	index: number;
	postType: POST_TYPE;
	content: string;
}

export interface Comment {
	id: string;
	author: CommentUser;
	content: string;
	createdTime: string;
}

export interface FeedPreview {
	newestPost: PostPreview | null;
	user: FriendUser;
}