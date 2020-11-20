import React, { useReducer, createContext, ReactNode } from 'react';

import { Post, POST_TYPE, Comment, AuthUser } from '../types';

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

	const getPosts = (jwt: string, id: string) => {
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
			payload: [
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
		});
	};

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
				}}>
				{children}
			</ProfileContext.Provider>
		</>
	);
};

export default ProfileProvider;
