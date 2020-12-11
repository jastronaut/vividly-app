import React, {
	useReducer,
	createContext,
	ReactNode,
	useContext,
	useCallback,
} from 'react';

import { Post, Comment, AuthUser, PostContent, PostContentRaw } from '../types';
import { mockProfiles } from '../mockData';
import { AuthContext } from '../AuthProvider';

type ProfileState = {
	posts: Post[];
	isProfileLoading: boolean;
	cursor: string | null; // not real lol
	hasMorePosts: boolean;
	isLoadingMore: boolean;
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
	resetCursor: Function;
	resetProfile: Function;
};

export const ProfileContext = createContext<ProfileContextType>({
	state: {
		posts: [],
		isProfileLoading: false,
		cursor: null,
		hasMorePosts: true,
		isLoadingMore: false,
	},
	getPosts: () => null,
	toggleLikePost: () => null,
	addComment: () => null,
	deleteComment: () => null,
	addPost: (jwt: string, postContent: PostContent[]) => null,
	deletePost: () => null,
	setProfileLoading: () => null,
	clearPosts: () => null,
	resetCursor: () => null,
	resetProfile: () => null,
});

enum PROFILE_ACTIONS {
	GET_POSTS,
	POSTS_LOADING,
	ADD_COMMENT,
	DELETE_COMMENT,
	ADD_POST,
	DELETE_POST,
	TOGGLE_LIKE_POST,
	SET_CURSOR,
	APPEND_POSTS,
	SET_LOADING_MORE,
	RESET_PROFILE,
}

type GetPostsAction = {
	type: typeof PROFILE_ACTIONS.GET_POSTS;
	payload: {
		posts: Post[];
		hasMorePosts: boolean;
	};
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

type SetCursorAction = {
	type: typeof PROFILE_ACTIONS.SET_CURSOR;
	payload: {
		cursor: string | null;
	};
};

type AppendPostsAction = {
	type: typeof PROFILE_ACTIONS.APPEND_POSTS;
	payload: {
		posts: Post[];
		hasMorePosts: boolean;
	};
};

type SetLoadingMorePosts = {
	type: typeof PROFILE_ACTIONS.SET_LOADING_MORE;
	payload: {
		isLoadingMore: boolean;
	};
};

type ResetProfileAction = {
	type: typeof PROFILE_ACTIONS.RESET_PROFILE;
	payload?: null;
};

type ProfileActions =
	| GetPostsAction
	| ToggleLikePostAction
	| PostsLoadingAction
	| AddCommentAction
	| DeleteCommentAction
	| AddPostAction
	| DeletePostAction
	| SetCursorAction
	| AppendPostsAction
	| SetLoadingMorePosts
	| ResetProfileAction;

function reducer(state: ProfileState, action: ProfileActions): ProfileState {
	switch (action.type) {
		case PROFILE_ACTIONS.GET_POSTS:
			return {
				...state,
				posts: action.payload.posts,
				hasMorePosts: action.payload.hasMorePosts,
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
		case PROFILE_ACTIONS.SET_CURSOR:
			return {
				...state,
				cursor: action.payload.cursor,
			};
		case PROFILE_ACTIONS.APPEND_POSTS:
			return {
				...state,
				posts: [...state.posts, ...action.payload.posts],
				hasMorePosts: action.payload.hasMorePosts,
				isProfileLoading: false,
				isLoadingMore: false,
			};
		case PROFILE_ACTIONS.SET_LOADING_MORE:
			return {
				...state,
				isLoadingMore: action.payload.isLoadingMore,
			};
		case PROFILE_ACTIONS.RESET_PROFILE:
			return {
				posts: [],
				isProfileLoading: false,
				cursor: null,
				hasMorePosts: true,
				isLoadingMore: false,
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
		cursor: null,
		hasMorePosts: true,
		isLoadingMore: false,
	});
	if (!jwt) return <>{children}</>;

	const getPosts = (id: string) => {
		if (!state.hasMorePosts) return;

		if (state.cursor === null) {
			profileDispatch({
				type: PROFILE_ACTIONS.POSTS_LOADING,
			});
		} else {
			profileDispatch({
				type: PROFILE_ACTIONS.SET_LOADING_MORE,
				payload: {
					isLoadingMore: true,
				},
			});
		}

		const fetchFeed = async () => {
			try {
				if (!jwt) throw Error('missing jwt');
				const req = await fetch(
					`http://127.0.0.1:1337/v0/friends/feed/${id}${
						state.cursor ? '/' + state.cursor : ''
					}`,
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

				if (res.hasMorePosts) {
					const lastPost: Post = res.posts[res.posts.length - 1];
					profileDispatch({
						type: PROFILE_ACTIONS.SET_CURSOR,
						payload: {
							cursor: lastPost.createdTime,
						},
					});
				}
				console.log('here for ', id);
				profileDispatch({
					type: PROFILE_ACTIONS.APPEND_POSTS,
					payload: {
						posts: res.posts,
						hasMorePosts: res.hasMorePosts,
					},
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
			payload: {
				posts: [],
				hasMorePosts: true,
			},
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

	const resetCursor = () => {
		profileDispatch({
			type: PROFILE_ACTIONS.SET_CURSOR,
			payload: {
				cursor: null,
			},
		});
	};

	const resetProfile = () => {
		profileDispatch({
			type: PROFILE_ACTIONS.RESET_PROFILE
		})
	}

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
					resetCursor,
					resetProfile
				}}>
				{children}
			</ProfileContext.Provider>
		</>
	);
};

export default ProfileProvider;
