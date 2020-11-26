import React, { useReducer, createContext, ReactNode } from 'react';

import { Post, Comment, AuthUser, PostContent } from '../types';
import { mockProfiles } from '../mockData';

type ProfileState = {
	posts: Post[];
	isProfileLoading: boolean;
};

type ProfileContextType = {
	state: ProfileState;
	getPosts: Function;
	toggleLikePost: Function;
	addComment: Function;
	deleteComment: Function;
	addPost: Function;
	setProfileLoading: Function;
	clearPosts: Function;
};

export const ProfileContext = createContext<ProfileContextType>({
	state: {
		posts: [],
		isProfileLoading: false,
	},
	getPosts: () => null,
	toggleLikePost: () => null,
	addComment: () => null,
	deleteComment: () => null,
	addPost: (jwt: string, postContent: PostContent[]) => null,
	setProfileLoading: () => null,
	clearPosts: () => null,
});

enum PROFILE_ACTIONS {
	GET_POSTS,
	POSTS_LOADING,
	ADD_COMMENT,
	DELETE_COMMENT,
	ADD_POST,
	TOGGLE_LIKE_POST,
}

type GetPostsAction = {
	type: typeof PROFILE_ACTIONS.GET_POSTS;
	payload: Post[];
};

type ToggleLikePostAction = {
	type: typeof PROFILE_ACTIONS.TOGGLE_LIKE_POST;
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

type AddPostAction = {
	type: typeof PROFILE_ACTIONS.ADD_POST;
	payload: Post;
};

type ProfileActions =
	| GetPostsAction
	| ToggleLikePostAction
	| PostsLoadingAction
	| AddCommentAction
	| DeleteCommentAction
	| AddPostAction;

function reducer(state: ProfileState, action: ProfileActions): ProfileState {
	switch (action.type) {
		case PROFILE_ACTIONS.GET_POSTS:
			return {
				posts: action.payload,
				isProfileLoading: false,
			};
		case PROFILE_ACTIONS.TOGGLE_LIKE_POST:
			return {
				posts: state.posts.map((post) => {
					if (post.id === action.payload) {
						if (post.isLikedByUser) {
							post.isLikedByUser = false;
							post.likeCount--;
						} else {
							post.isLikedByUser = true;
							post.likeCount++;
						}
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
		case PROFILE_ACTIONS.ADD_POST:
			return {
				...state,
				posts: [action.payload].concat(state.posts),
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

	const getPosts = (jwt: string, id: string, startingPostIndex = 0) => {
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
			payload: mockProfiles[id],
		});
	};

	const toggleLikePost = (jwt: string, id: string) => {
		// TODO: write request to like/unlike post
		profileDispatch({
			type: PROFILE_ACTIONS.TOGGLE_LIKE_POST,
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

	const addPost = (jwt: string, postContent: PostContent[]) => {
		const mockPost: Post = {
			id: Date.now().toString(),
			createdTime: Date.now().toString(),
			content: postContent,
			isUpdated: false,
			likeCount: 0,
			isLikedByUser: false,
			comments: [],
		};
		profileDispatch({
			type: PROFILE_ACTIONS.ADD_POST,
			payload: mockPost,
		});
	};

	const setProfileLoading = () => {
		profileDispatch({
			type: PROFILE_ACTIONS.POSTS_LOADING,
		});
	};

	const clearPosts = () => {
		profileDispatch({
			type: PROFILE_ACTIONS.GET_POSTS,
			payload: [],
		});
	};

	return (
		<>
			<ProfileContext.Provider
				value={{
					state,
					getPosts,
					toggleLikePost,
					addComment,
					deleteComment,
					addPost,
					setProfileLoading,
					clearPosts,
				}}>
				{children}
			</ProfileContext.Provider>
		</>
	);
};

export default ProfileProvider;
