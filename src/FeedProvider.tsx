import React, { createContext, useReducer, ReactNode } from 'react';

import { FeedPreview, POST_TYPE } from './types';

type FeedState = {
	feed: FeedPreview[];
	isFeedLoading: boolean;
};

type FeedContextType = {
	getFeed: Function;
	markFeedRead: Function;
	feedState: FeedState;
};

export const FeedContext = createContext<FeedContextType>({
	getFeed: () => null,
	markFeedRead: () => null,
	feedState: {
		feed: [],
		isFeedLoading: false,
	},
});

enum FEED_ACTIONS {
	GET_FEED,
	MARK_FEED_READ,
	FEED_LOADING,
}

type GetFeedAction = {
	type: typeof FEED_ACTIONS.GET_FEED;
	payload: FeedPreview[];
};

type MarkFeedReadAction = {
	type: typeof FEED_ACTIONS.MARK_FEED_READ;
	payload: string;
};

type FeedLoadingAction = {
	type: typeof FEED_ACTIONS.FEED_LOADING;
	payload?: null;
};

type FeedActions = GetFeedAction | MarkFeedReadAction | FeedLoadingAction;

function reducer(state: FeedState, action: FeedActions): FeedState {
	switch (action.type) {
		case FEED_ACTIONS.GET_FEED:
			return {
				feed: action.payload,
				isFeedLoading: false,
			};
		case FEED_ACTIONS.MARK_FEED_READ:
			const feed = state.feed?.map((userFeed) => {
				if (userFeed.user.id === action.payload) {
					userFeed.user.unreadPosts = 0;
				}
				return userFeed;
			});

			return {
				feed: feed,
				isFeedLoading: false,
			};
		case FEED_ACTIONS.FEED_LOADING:
			return {
				...state,
				isFeedLoading: true,
			};
		default:
			return state;
	}
}

const FeedProvider = ({ children }: { children: ReactNode }) => {
	const [feedState, feedDispatch] = useReducer(reducer, {
		feed: [],
		isFeedLoading: false,
	});

	const getFeed = (jwt: string) => {
		feedDispatch({
			type: FEED_ACTIONS.FEED_LOADING,
		});

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

				feedDispatch({
					type: FEED_ACTIONS.GET_FEED,
					payload: resp,
				});
			} catch (e) {
				console.log('error: cant fetch feed');
				console.log(e);
			}
		};
		// requestFeed();
		feedDispatch({
			type: FEED_ACTIONS.GET_FEED,

			payload: [
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
			],
		});
	};

	const markFeedRead = (jwt: string, friendId: string) => {
		// TODO: write request to mark feed as read
		feedDispatch({
			type: FEED_ACTIONS.MARK_FEED_READ,
			payload: friendId,
		});
	};

	return (
		<FeedContext.Provider
			value={{
				getFeed,
				markFeedRead,
				feedState,
			}}>
			{children}
		</FeedContext.Provider>
	);
};

export default FeedProvider;
