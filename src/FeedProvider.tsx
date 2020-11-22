import React, { createContext, useReducer, ReactNode } from 'react';

import { FeedPreview } from './types';
import { mockFeed } from './mockData';

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
			payload: mockFeed
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
