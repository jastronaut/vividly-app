import React, { useReducer, createContext, ReactNode } from 'react';

import { Post, Comment, AuthUser } from '../types';
import { mockProfiles } from '../mockData';

type ProfileState = {
	posts: Post[];
	isProfileLoading: boolean;
};

type ProfileContextType = {
	state: ProfileState;
	getPosts: Function;
	likePost: Function;
	unlikePost: Function;
	addComment: Function;
	deleteComment: Function;
	setPosts: Function;
};

export const ProfileContext = createContext<ProfileContextType>({
	state: {
		posts: [],
		isProfileLoading: false,
	},
	getPosts: () => null,
	likePost: () => null,
	unlikePost: () => null,
	addComment: () => null,
	deleteComment: () => null,
	setPosts: () => null
});

enum PROFILE_ACTIONS {
	GET_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	POSTS_LOADING,
	ADD_COMMENT,
	DELETE_COMMENT,
}

type GetPostsAction = {
	type: typeof PROFILE_ACTIONS.GET_POSTS;
	payload: Post[];
};

type LikePostAction = {
	type: typeof PROFILE_ACTIONS.LIKE_POST;
	payload: string;
};

type UnlikePostAction = {
	type: typeof PROFILE_ACTIONS.UNLIKE_POST;
	payload: string;
};

type PostsLoadingAction = {
	type: typeof PROFILE_ACTIONS.POSTS_LOADING;
	payload?: null;
};

type AddCommentAction = {
	type: typeof PROFILE_ACTIONS.ADD_COMMENT;
	payload: {
		id: string;
		comment: Comment;
	};
};

type DeleteCommentAction = {
	type: typeof PROFILE_ACTIONS.DELETE_COMMENT;
	payload: {
		id: string;
		commentId: string;
	};
};

type ProfileActions =
	| GetPostsAction
	| LikePostAction
	| UnlikePostAction
	| PostsLoadingAction
	| AddCommentAction
	| DeleteCommentAction;

function reducer(state: ProfileState, action: ProfileActions): ProfileState {
	switch (action.type) {
		case PROFILE_ACTIONS.GET_POSTS:
			return {
				posts: action.payload,
				isProfileLoading: false,
			};
		case PROFILE_ACTIONS.LIKE_POST:
			return {
				posts: state.posts.map((post) => {
					if (post.id === action.payload) {
						post.isLikedByUser = true;
						post.likeCount++;
					}
					return post;
				}),
				isProfileLoading: false,
			};
		case PROFILE_ACTIONS.UNLIKE_POST:
			return {
				posts: state.posts.map((post) => {
					if (post.id === action.payload) {
						post.isLikedByUser = false;
						post.likeCount--;
					}
					return post;
				}),
				isProfileLoading: false,
			};
		case PROFILE_ACTIONS.POSTS_LOADING:
			return {
				...state,
				isProfileLoading: true,
			};
		case PROFILE_ACTIONS.ADD_COMMENT:
			return {
				posts: state.posts.map((post) => {
					if (post.id === action.payload.id) {
						post.comments.push(action.payload.comment);
					}
					return post;
				}),
				isProfileLoading: false,
			};
		case PROFILE_ACTIONS.DELETE_COMMENT:
			return {
				posts: state.posts.map((post) => {
					if (post.id === action.payload.id) {
						post.comments = post.comments.filter(
							(comment) =>
								comment.id !== action.payload.commentId,
						);
					}
					return post;
				}),
				isProfileLoading: false,
			};
		default:
			return state;
	}
}

const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [state, profileDispatch] = useReducer(reducer, {
		posts: [],
		isProfileLoading: false,
	});

	const getPosts = (jwt: string, id: string, startingPostIndex=0) => {
		profileDispatch({
			type: PROFILE_ACTIONS.POSTS_LOADING,
		});

		const fetchFeed = async () => {
			try {
				const req = await fetch(
					`http://127.0.0.1:1337/v0/friends/feed/${id}/${startingPostIndex}`,
					{
						method: 'GET',
						headers: {
							'x-auth-token': jwt,
						},
					},
				);
				const res = await req.json();

				if (res.status !== 200) {
					throw Error('unable to make feed request');
				}

				profileDispatch({
					type: PROFILE_ACTIONS.GET_POSTS,
					payload: res,
				});
			} catch (e) {
				console.log('error: cant get feed for user ' + id);
				console.log(e);
			}
		};
		// fetchFeed();
		profileDispatch({
			type: PROFILE_ACTIONS.GET_POSTS,
			payload: mockProfiles[id]
		});
	};

	const setPosts = (posts: Post[]) => {
		profileDispatch({
			type: PROFILE_ACTIONS.POSTS_LOADING,
		});
		profileDispatch({
			type: PROFILE_ACTIONS.GET_POSTS,
			payload: posts
		});
	}

	const likePost = (jwt: string, id: string) => {
		// TODO: write request to like post
		profileDispatch({
			type: PROFILE_ACTIONS.LIKE_POST,
			payload: id,
		});
	};

	const unlikePost = (jwt: string, id: string) => {
		// TODO: write request to unlike post
		profileDispatch({
			type: PROFILE_ACTIONS.UNLIKE_POST,
			payload: id,
		});
	};

	const addComment = (
		jwt: string,
		id: string,
		comment: string,
		user: AuthUser,
	) => {
		// TODO: write request to add comment
		const newComment = {
			id: 'fakeId' + comment + Date.now().toString(),
			author: {
				...user,
				isFriendsWithAuthUser: true,
			},
			content: comment,
			createdTime: Date.now().toString(),
		};

		profileDispatch({
			type: PROFILE_ACTIONS.ADD_COMMENT,
			payload: {
				id,
				comment: newComment,
			},
		});
	};

	const deleteComment = (jwt: string, id: string, commentId: string) => {
		// TODO: write request to delete comment
		profileDispatch({
			type: PROFILE_ACTIONS.DELETE_COMMENT,
			payload: {
				id,
				commentId,
			},
		});
	};

	return (
		<>
			<ProfileContext.Provider
				value={{
					state,
					getPosts,
					likePost,
					unlikePost,
					addComment,
					deleteComment,
					setPosts
				}}>
				{children}
			</ProfileContext.Provider>
		</>
	);
};

export default ProfileProvider;
