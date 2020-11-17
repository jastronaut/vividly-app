import { useState, createContext, useReducer } from 'react';

import {
	BaseUser,
	FeedPreview,
	PostPreview,
	PostContent,
	POST_TYPE,
} from './types';

type FeedContextType = {
	feed: FeedPreview[] | null;
	isFeedLoading: boolean;
	loadFeedForUser: Function;
	getNextUser: Function;
};

export const useProvideFeed = () => {
	const [feed, setFeed] = useState<FeedPreview[] | null>(null);
	const [isFeedLoading, setIsFeedLoading] = useState<boolean>(false);

	const loadFeedForUser = (jwt: string) => {
		setIsFeedLoading(true);
		console.log('get feed with token', jwt);

		const requestFeed = async () => {
			try {
				const req = await fetch(
					'http://localhost:1337/v0/friends/feed',
					{
						method: 'GET',
						headers: {
							'x-auth-token': jwt,
							'Content-Type': 'application/json',
						},
					},
				);

				const resp = await req.json();
				console.log('...', resp);

				if (!resp || !req.status) {
					throw Error('cant request feed');
				}

				setFeed(resp);
			} catch (e) {
				console.log('error: cant fetch feed');
				console.log(e);
			}
		};
		// requestFeed();
		setFeed([
			{
				newestPost: {
					id: 'fakepost1',
					createdTime: '2020-11-13T02:32:16.178+00:00',
					// createdTime: '2020-11-10T00:00:00+00:00',
					content: {
						index: 0,
						postType: POST_TYPE.text,
						content: 'this post isnt real',
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
		]);

		setIsFeedLoading(false);
	};

	const getNextUser = (index: number) => {
		if (!feed) return null;
		if (index >= feed.length - 1) return null;
		let newIndex = 0;
		if (index < 0) newIndex = 0;
		else newIndex = index + 1;
		const nextUser = feed[newIndex].user;
		if (nextUser.unreadPosts > 0) return nextUser;
		return null;
	};

	return {
		feed,
		isFeedLoading,
		loadFeedForUser,
		getNextUser,
	};
};

export default createContext<FeedContextType>({
	feed: null,
	isFeedLoading: false,
	loadFeedForUser: () => null,
	getNextUser: () => null,
});
