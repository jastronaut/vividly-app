import { AuthUser, POST_TYPE, FeedPreview, Post } from './types';

export const testToken = 'Fake.JWT.Lol';
export const mockAuthUser: AuthUser = {
	id: '0',
	name: 'Very Cool User ✨',
	username: 'coolestusername',
	bio: "I love using Peached even if it doesn't work",
	profilePicture: '',
	emailVerified: true,
	email: 'test@test.com',
	blockedWords: [],
	friends: [],
	posts: [
		{
			id: 'authpost1',
			isUpdated: false,
			likeCount: 0,
			isLikedByUser: false,
			createdTime: '2020-11-10T02:32:16.178+00:00',
			comments: [
				{
					id: 'authpost1comment1',
					author: {
						bio: "I love using Peached even if it doesn't work",
						id: '0',
						name: 'Very Cool User ✨',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'coolestusername',
					},
					content: 'so true',
					createdTime: '2020-11-16T02:35:41+00:00',
				},
				{
					id: 'post1comment2',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content:
						'jflskdf skdfjh sdjf alksdjf askdf askldfsdjhf asjdfh asdf. ksdfh ksdj djksfh askjdf skdjhf lasdflas lasdhf\n skdhfklsaf\n',
					createdTime: '2020-11-18T02:35:41+00:00',
				},
				{
					id: 'post1comment3',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content:
						'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
					createdTime: '2020-11-19T02:35:41+00:00',
				},
			],
			content: [
				{
					index: 0,
					postType: POST_TYPE.text,
					content: 'Hello this is the first psot',
				},
				{
					index: 1,
					postType: POST_TYPE.text,
					content: 'arent you glad i made this',
				},
			],
		},
	],
};

export const mockFeed: FeedPreview[] = [
	{
		newestPost: {
			id: 'fakepost1',
			createdTime: '2020-11-13T02:32:16.178+00:00',
			// createdTime: '2020-11-10T00:00:00+00:00',
			content: {
				index: 0,
				postType: POST_TYPE.text,
				content: 'Hello this is the first psot',
			},
		},
		user: {
			bio: 'FIRSTUSER',
			id: 'user1',
			isFavorite: true,
			name: 'FIRSTFAKEUSERr',
			profilePicture:
				'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
			unreadPosts: 3,
			username: 'fakeuser1',
		},
	},
	{
		newestPost: {
			id: 'fakepost1',
			createdTime: '2020-11-13T02:32:16.178+00:00',
			// createdTime: '2020-11-10T00:00:00+00:00',
			content: {
				index: 0,
				postType: POST_TYPE.text,
				content: 'this is a long post preview on the home page',
			},
		},
		user: {
			bio: 'lalala',
			id: 'fakeuser1',
			isFavorite: false,
			name: 'fake user',
			profilePicture:
				'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
			unreadPosts: 1,
			username: 'fakseuser',
		},
	},
	{
		newestPost: null,
		user: {
			bio: '',
			id: '5fada94b9b1559ae5e4ca5e6',
			isFavorite: false,
			name: 'the god',
			profilePicture:
				'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
			unreadPosts: 0,
			username: 'admin',
		},
	},
];

type MockProfiles = {
    [id: string]: Post[];
}

export const mockProfiles: MockProfiles = {
	'user1': [
		{
			id: 'post2',
			isUpdated: false,
			likeCount: 3,
			isLikedByUser: true,
			createdTime: '2020-11-13T02:32:16.178+00:00',
			comments: [],
			content: [
				{
					index: 0,
					postType: POST_TYPE.text,
					content: 'SEOCNDS POST',
				},
				{
					index: 1,
					postType: POST_TYPE.text,
					content: 'SECOND POST......',
				},
			],
		},
		{
			id: 'post1',
			isUpdated: false,
			likeCount: 0,
			isLikedByUser: false,
			createdTime: '2020-11-10T02:32:16.178+00:00',
			comments: [
				{
					id: 'post1comment1',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content: 'this is my own post',
					createdTime: '2020-11-16T02:35:41+00:00',
				},
				{
					id: 'post1comment2',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content:
						'jflskdf skdfjh sdjf alksdjf askdf askldfsdjhf asjdfh asdf. ksdfh ksdj djksfh askjdf skdjhf lasdflas lasdhf\n skdhfklsaf\n',
					createdTime: '2020-11-18T02:35:41+00:00',
				},
				{
					id: 'post1comment3',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content:
						'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
					createdTime: '2020-11-19T02:35:41+00:00',
				},
			],
			content: [
				{
					index: 0,
					postType: POST_TYPE.text,
					content: 'Hello this is the first psot',
				},
				{
					index: 1,
					postType: POST_TYPE.text,
					content: 'arent you glad i made this',
				},
			],
		},
	],
	'fakeuser1': [
		{
			id: 'post1',
			isUpdated: false,
			likeCount: 0,
			isLikedByUser: false,
			createdTime: '2020-11-10T02:32:16.178+00:00',
			comments: [
				{
					id: 'post1comment1',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content: 'this is my own post',
					createdTime: '2020-11-16T02:35:41+00:00',
				},
				{
					id: 'post1comment2',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content:
						'jflskdf skdfjh sdjf alksdjf askdf askldfsdjhf asjdfh asdf. ksdfh ksdj djksfh askjdf skdjhf lasdflas lasdhf\n skdhfklsaf\n',
					createdTime: '2020-11-18T02:35:41+00:00',
				},
				{
					id: 'post1comment3',
					author: {
						bio: 'lalala',
						id: 'fakeuser1',
						name: 'fake user',
						profilePicture:
							'https://peachedstorage.blob.core.windows.net/profilepics/default.png',
						isFriendsWithAuthUser: true,
						username: 'fakseuser',
					},
					content:
						'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
					createdTime: '2020-11-19T02:35:41+00:00',
				},
			],
			content: [
				{
					index: 0,
					postType: POST_TYPE.text,
					content: 'this is a long post preview on the home page',
				},
			],
		},
	],
};
