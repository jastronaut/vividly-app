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
}

export interface AuthUser extends BaseUser {
	emailVerified: boolean;
	email: string;
	blockedWords: string[];
	friends: Friend[];
	hasUnreadNotifications: boolean;
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
export interface TextPost {
	index: number;
	postType: typeof POST_TYPE.text;
	content: string;
}

export interface LinkPost {
	index: number;
	postType: typeof POST_TYPE.link;
	content: string;
}

export interface ImagePost {
	index: number;
	postType: typeof POST_TYPE.image;
	content: string;
	width: number;
	height: number;
}

export type PostContent = TextPost | ImagePost | LinkPost;
export type PostContentRaw = Omit<TextPost, 'index'> | Omit<ImagePost, 'index'> | Omit<LinkPost, 'index'>;

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
