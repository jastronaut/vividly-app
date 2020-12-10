import React, { createContext, useReducer, ReactNode, useContext } from 'react';

import { AuthContext } from './AuthProvider';
import { FeedPreview } from './types';
import { mockFeed, mockAuthUserFeed } from './mockData';

type FeedState = {
	feed: FeedPreview[];
	authUserFeed: FeedPreview | null;
	isFeedLoading: boolean;
};

type FeedContextType = {
	getFeed: Function;
	markFeedRead: Function;
	removeFeed: Function;
	feedState: FeedState;
};

export const FeedContext = createContext<FeedContextType>({
	getFeed: () => null,
	markFeedRead: () => null,
	removeFeed: () => null,
	feedState: {
		feed: [],
		isFeedLoading: false,
		authUserFeed: null,
	},
});

enum FEED_ACTIONS {
	GET_FEED,
	MARK_FEED_READ,
	FEED_LOADING,
	SET_AUTH_USER_FEED,
	REMOVE_FEED,
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

type SetAuthUserFeedAction = {
	type: typeof FEED_ACTIONS.SET_AUTH_USER_FEED;
	payload: FeedPreview;
};

type RemoveFeedAction = {
	type: typeof FEED_ACTIONS.REMOVE_FEED;
	payload: string;
};

type FeedActions =
	| GetFeedAction
	| MarkFeedReadAction
	| FeedLoadingAction
	| SetAuthUserFeedAction
	| RemoveFeedAction;

function reducer(state: FeedState, action: FeedActions): FeedState {
	switch (action.type) {
		case FEED_ACTIONS.GET_FEED:
			return {
				...state,
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
				...state,
				feed: feed,
				isFeedLoading: false,
			};
		case FEED_ACTIONS.SET_AUTH_USER_FEED:
			return {
				...state,
				authUserFeed: action.payload,
			};
		case FEED_ACTIONS.FEED_LOADING:
			return {
				...state,
				isFeedLoading: true,
			};
		case FEED_ACTIONS.REMOVE_FEED:
			return {
				...state,
				feed: state.feed.filter(
					(feed) => feed.user.id !== action.payload,
				),
			};
		default:
			return state;
	}
}

const FeedProvider = ({ children }: { children: ReactNode }) => {
	const { jwt } = useContext(AuthContext).authState;
	const [feedState, feedDispatch] = useReducer(reducer, {
		feed: [],
		isFeedLoading: false,
		authUserFeed: null,
	});

	const getFeed = () => {
		feedDispatch({
			type: FEED_ACTIONS.FEED_LOADING,
		});

		const requestFeed = async () => {
			try {
				if (!jwt) throw Error('no jwt');
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

				if (!resp || !resp.success) {
					throw Error('cant request feed');
				}

				const { friends, authUserFeed } = resp;

				feedDispatch({
					type: FEED_ACTIONS.SET_AUTH_USER_FEED,
					payload: authUserFeed,
				});

				feedDispatch({
					type: FEED_ACTIONS.GET_FEED,
					payload: friends,
				});
			} catch (e) {
				console.log('error: cant fetch feed');
				console.log(e);
			}
		};
		// requestFeed();
		feedDispatch({
			type: FEED_ACTIONS.SET_AUTH_USER_FEED,
			payload: mockAuthUserFeed,
		});

		feedDispatch({
			type: FEED_ACTIONS.GET_FEED,
			payload: mockFeed,
		});
	};

	const markFeedRead = (friendId: string) => {
		// TODO: write request to mark feed as read
		feedDispatch({
			type: FEED_ACTIONS.MARK_FEED_READ,
			payload: friendId,
		});
	};

	const removeFeed = (friendId: string) => {
		// TODO: write request to delete friend
		feedDispatch({
			type: FEED_ACTIONS.REMOVE_FEED,
			payload: friendId,
		});
	};

	return (
		<FeedContext.Provider
			value={{
				getFeed,
				markFeedRead,
				feedState,
				removeFeed,
			}}>
			{children}
		</FeedContext.Provider>
	);
};

export default FeedProvider;
