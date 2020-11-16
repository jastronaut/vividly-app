import { useState, createContext } from 'react';

import { Post, POST_TYPE } from '../types';

type ProfileContextType = {
	posts: Post[] | null;
	isProfileLoading: boolean;
	getUserFeed: Function;
};

export const useProvideProfile = () => {
	const [posts, setPosts] = useState<Post[] | null>(null);
	const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);

	const getUserFeed = (id: string, jwt: string, startingPostIndex = 0) => {
		setIsProfileLoading(true);
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

				setPosts(res);
			} catch (e) {
				console.log('error: cant get feed for user ' + id);
				console.log(e);
			}
		};
		// fetchFeed();

		setPosts([
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
		]);
		setIsProfileLoading(false);
	};

	const likePostOnFeed = (postId: string, jwt: string) => {
		if (posts === null) return;
		const sendLikeRequest = async () => {
			try {
				const req = await fetch(
					`http://127.0.0.1:1337/v0/posts/${postId}/like`,
					{
						method: 'POST',
						headers: {
							'x-auth-token': jwt,
						},
					},
				);
				const res = await req.json();
				if (!res || !req.ok) {
					throw Error('something went wrong sending a like request');
				}

				setPosts((posts) =>
					posts
						? posts?.map((post) => {
								if (post.id === postId) {
									post.isLikedByUser = true;
									post.likeCount = post.likeCount + 1;
								}
								return post;
						  })
						: null,
				);
			} catch (e) {
				console.log('error: cant like post on profile feed');
				console.log(e);
			}
		};
	};

	return {
		posts,
		isProfileLoading,
		getUserFeed,
	};
};

export default createContext<ProfileContextType>({
	posts: null,
	isProfileLoading: false,
	getUserFeed: () => null,
});
