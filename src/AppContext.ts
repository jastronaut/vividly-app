import { createContext } from 'react';
import { User } from './interfaces';

interface ContextTypes {
	friends: User[];
	curUser: User;
	findNextUser: (curIndex: number) => (User | null);
	markFeedRead: (curIndex: number) => void;
}

export default createContext<ContextTypes>({
	friends: [
		{
			id: '1',
			name: 'User 1',
			username: 'user1username',
			profilePicture: './pup.jpeg',
			unreadPosts: 2,
			latestPost: {
				id: '11',
				content: [
					{
						type: 'text',
						content: 'hello world 1',
					},
				],
				updatedTime: 5,
			},
		},
		{
			id: '2',
			name: 'User 2',
			username: 'user2username',
			profilePicture: './pup.jpeg',
			unreadPosts: 1,

			latestPost: {
				id: '22',
				content: [
					{
						type: 'text',
						content: 'hello world 2',
					},
				],
				updatedTime: 4,
			},
		},
		{
			id: '3',
			name: 'User 3',
			username: 'user3username',
			profilePicture: './pup.jpeg',
			unreadPosts: 0,
			latestPost: {
				id: '33',
				content: [
					{
						type: 'text',
						content: 'hello world 3',
					},
				],
				updatedTime: 5,
			},
		},
		{
			id: '4',
			name: 'User 4',
			username: 'user4username',
			profilePicture: './pup.jpeg',
			unreadPosts: 0,
			latestPost: {
				id: '44',
				content: [
					{
						type: 'text',
						content: 'hello world 4',
					},
				],
				updatedTime: 6,
			},
		},
	],
	curUser: {
		id: '9',
		name: 'Jas',
		username: 'jastronaut',
		profilePicture: './pup.jpeg',
		unreadPosts: 0,
		latestPost: {
			id: '99',
			content: [
				{
					type: 'text',
					content: 'hello world 9',
				},
			],
			updatedTime: 1,
		},
	},

	findNextUser: (curIndex: number) => null,
	markFeedRead: (curIndex: number) => {}
});
