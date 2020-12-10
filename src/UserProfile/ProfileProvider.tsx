import React, { useReducer, createContext, ReactNode, useContext } from 'react';

import { Post, Comment, AuthUser, PostContent, PostContentRaw } from '../types';
import { mockProfiles } from '../mockData';
import { AuthContext } from '../AuthProvider';

type ProfileState = {
	posts: Post[];
	isProfileLoading: boolean;
	cursor: number; // not real lol
};

type ProfileContextType = {
	state: ProfileState;
	getPosts: Function;
	toggleLikePost: Function;
	addComment: Function;
	deleteComment: Function;
	addPost: Function;
	deletePost: Function;
	setProfileLoading: Function;
	clearPosts: Function;
};

export const ProfileContext = createContext<ProfileContextType>({
	state: {
		posts: [],
		isProfileLoading: false,
		cursor: 0,
	},
	getPosts: () => null,
	toggleLikePost: () => null,
	addComment: () => null,
	deleteComment: () => null,
	addPost: (jwt: string, postContent: PostContent[]) => null,
	deletePost: () => null,
	setProfileLoading: () => null,
	clearPosts: () => null,
});

enum PROFILE_ACTIONS {
	GET_POSTS,
	POSTS_LOADING,
	ADD_COMMENT,
	DELETE_COMMENT,
	ADD_POST,
	DELETE_POST,
	TOGGLE_LIKE_POST,
	INCREASE_CURSOR,
	APPEND_POSTS,
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

type DeletePostAction = {
	type: typeof PROFILE_ACTIONS.DELETE_POST;
	payload: string;
};

type IncreaseCursorAction = {
	type: typeof PROFILE_ACTIONS.INCREASE_CURSOR;
	payload?: null;
};

type AppendPostsAction = {
	type: typeof PROFILE_ACTIONS.APPEND_POSTS;
	payload: Post[];
};

type ProfileActions =
	| GetPostsAction
	| ToggleLikePostAction
	| PostsLoadingAction
	| AddCommentAction
	| DeleteCommentAction
	| AddPostAction
	| DeletePostAction
	| IncreaseCursorAction
	| AppendPostsAction;

function reducer(state: ProfileState, action: ProfileActions): ProfileState {
	switch (action.type) {
		case PROFILE_ACTIONS.GET_POSTS:
			return {
				...state,
				posts: action.payload,
				isProfileLoading: false,
			};
		case PROFILE_ACTIONS.TOGGLE_LIKE_POST:
			return {
				...state,
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
				...state,
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
				...state,
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
		case PROFILE_ACTIONS.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((p) => p.id !== action.payload),
			};
		case PROFILE_ACTIONS.INCREASE_CURSOR:
			return {
				...state,
				cursor: state.cursor + 15,
			};
		case PROFILE_ACTIONS.APPEND_POSTS:
			return {
				...state,
				posts: state.posts.concat(action.payload),
			};
		default:
			return state;
	}
}

const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const { jwt } = useContext(AuthContext).authState;
	const [state, profileDispatch] = useReducer(reducer, {
		posts: [],
		isProfileLoading: false,
		cursor: 0,
	});
	if (!jwt) return <>{children}</>;

	const getPosts = (id: string, startingPostIndex = 0) => {
		profileDispatch({
			type: PROFILE_ACTIONS.POSTS_LOADING,
		});

		const fetchFeed = async () => {
			try {
				if (!jwt) throw Error('missing jwt');
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

				if (!res || !res.success) {
					throw Error('unable to make feed request');
				}

				profileDispatch({
					type: PROFILE_ACTIONS.GET_POSTS,
					payload: res.posts,
				});
			} catch (e) {
				console.log('error: cant get feed for user ' + id);
				console.log(e);
			}
		};
		fetchFeed();
	};

	const toggleLikePost = (id: string, isLiked: boolean) => {
		const likeReq = async () => {
			try {
				const req = await fetch(
					`http://127.0.0.1:1337/v0/posts/${id}/${
						isLiked ? 'unlike' : 'like'
					}`,
					{
						method: 'POST',
						headers: {
							'x-auth-token': jwt,
							'Content-Type': 'application/json',
						},
					},
				);

				const res = await req.json();
				if (!res) throw Error('cant make POST request');
				if (!res.success) throw Error(res.msg);

				profileDispatch({
					type: PROFILE_ACTIONS.TOGGLE_LIKE_POST,
					payload: id,
				});
			} catch (e) {
				console.log('error: cant like/unlike post right now');
				console.log(e);
			}
		};

		likeReq();
	};

	const addComment = (id: string, comment: string, user: AuthUser) => {
		const commentRequest = async () => {
			try {
				const req = await fetch(
					`http://127.0.0.1:1337/v0/posts/${id}/comments`,
					{
						method: 'POST',
						headers: {
							'x-auth-token': jwt,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							content: comment,
						}),
					},
				);

				const res = await req.json();
				if (!res) throw Error('error making POST request');
				if (!res.success) throw Error(res.msg);

				profileDispatch({
					type: PROFILE_ACTIONS.ADD_COMMENT,
					payload: {
						id,
						comment: res.comment,
					},
				});
			} catch (e) {
				console.log('error: cant post comment right now');
				console.log(e);
			}
		};

		commentRequest();
	};

	const deleteComment = (id: string, commentId: string) => {
		const deleteRequest = async () => {
			try {
				const req = await fetch(
					`http://127.0.0.1:1337/v0/posts/${id}/comments/${commentId}`,
					{
						method: 'DELETE',
						headers: {
							'x-auth-token': jwt,
							'Content-Type': 'application/json',
						},
					},
				);

				const res = await req.json();
				if (!res) throw Error('error making DELETE request');
				if (!res.success) throw Error(res.msg);

				profileDispatch({
					type: PROFILE_ACTIONS.DELETE_COMMENT,
					payload: {
						id,
						commentId,
					},
				});
			} catch (e) {
				console.log('error: cant delete comment');
				console.log(e);
			}
		};

		deleteRequest();
	};

	const addPost = (postContent: PostContentRaw[]) => {
		const postPostRequest = async () => {
			try {
				const req = await fetch(`http://127.0.0.1:1337/v0/posts`, {
					method: 'POST',
					headers: {
						'x-auth-token': jwt,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						content: postContent,
					}),
				});

				const res = await req.json();
				if (!res) throw Error('cant make post request...');
				if (!res.success) throw Error(res.msg);

				profileDispatch({
					type: PROFILE_ACTIONS.ADD_POST,
					payload: res.newPost,
				});
			} catch (e) {
				console.log('error: cant add new post');
				console.log(e);
			}
		};
		postPostRequest();
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

	const deletePost = (postId: string) => {
		const deletePostRequest = async () => {
			try {
				const req = await fetch(
					`http://127.0.0.1:1337/v0/posts/${postId}`,
					{
						method: 'DELETE',
						headers: {
							'x-auth-token': jwt,
							'Content-Type': 'application/json',
						},
					},
				);

				const res = await req.json();
				if (!res) throw Error('cant make post request...');
				if (!res.success) throw Error(res.msg);

				profileDispatch({
					type: PROFILE_ACTIONS.DELETE_POST,
					payload: postId,
				});
			} catch (e) {
				console.log('error: cant delete post');
				console.log(e);
			}
		};
		deletePostRequest();
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
					deletePost,
					setProfileLoading,
					clearPosts,
				}}>
				{children}
			</ProfileContext.Provider>
		</>
	);
};

export default ProfileProvider;
