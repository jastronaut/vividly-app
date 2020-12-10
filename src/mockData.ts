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
	hasUnreadNotifications: true,
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
			unreadPosts: 2,
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
};

export const mockProfiles: MockProfiles = {
	user1: [
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
	fakeuser1: [
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
	'0': [
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
		{
			id: 'authpost2',
			isUpdated: true,
			likeCount: 50,
			isLikedByUser: true,
			createdTime: '2020-11-06T02:32:16.178+00:00',
			comments: [
				{
					id: 'authpost2comment1',
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
					content:
						'sjdhflkahdflak aksjdf skdjfh skjdfh sdkjfs fkdhs skdjfs skdjfsd skjdfhs fksjf jdf sdfhs fsjdfs sdfs\nskdjfhskdfh \nskdfalkdhf\naksdfhakdfalksdfh\n',
				},
				{
					index: 1,
					postType: POST_TYPE.text,
					content:
						'aksdjhflakdsfh\n\naksdjfhaldflasf\nnasfjhadffalksjfhlaksf',
				},
				{
					index: 2,
					postType: POST_TYPE.image,
					content:
						'https://peachedbackendcdkstack-peachedtestbucketd01e4d92-1txzppz4d0l3i.s3.amazonaws.com/5fada90c9b1559ae5e4ca5e5-61071b86-fb29-4ab1-90b9-aa88bedab0eb.jpeg',
					width: 535,
					height: 535,
				},
			],
		},
		{
			id: 'authpost3',
			isUpdated: true,
			likeCount: 50,
			isLikedByUser: true,
			createdTime: '2020-11-03T02:32:16.178+00:00',
			content: [
				{
					index: 0,
					postType: POST_TYPE.image,
					content:
						'https://peachedbackendcdkstack-peachedtestbucketd01e4d92-1txzppz4d0l3i.s3.amazonaws.com/5fada90c9b1559ae5e4ca5e5-8f11fb76-d27f-421c-875f-13f4cf964fd4.png',
					width: 512,
					height: 512,
				},
			],
			comments: [],
		},
		{
			id: 'authpost4',
			isUpdated: true,
			likeCount: 50,
			isLikedByUser: true,
			createdTime: '2020-11-01T02:32:16.178+00:00',
			content: [
				{
					index: 0,
					postType: POST_TYPE.link,
					content: 'https://reactnative.dev/docs/statusbar',
				},
				{
					index: 1,
					postType: POST_TYPE.link,
					content:
						'https://peachedbackendcdkstack-peachedtestbucketd01e4d92-1txzppz4d0l3i.s3.amazonaws.com/5fada90c9b1559ae5e4ca5e5-8f11fb76-d27f-421c-875f-13f4cf964fd4.png',
				},
			],
			comments: [],
		},
	],
};

export const mockAuthUserFeed: FeedPreview = {
	user: {
		id: mockAuthUser.id,
		name: mockAuthUser.name,
		username: mockAuthUser.username,
		bio: mockAuthUser.bio,
		profilePicture: mockAuthUser.profilePicture,
		isFavorite: false,
		unreadPosts: 0,
	},
	newestPost: {
		id: mockProfiles[mockAuthUser.id][0].id,
		createdTime: mockProfiles[mockAuthUser.id][0].createdTime,
		content: mockProfiles[mockAuthUser.id][0].content[0],
	},
};
