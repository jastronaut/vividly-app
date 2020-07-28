import React, { useLayoutEffect, useState } from 'react';
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppContext from './AppContext';
import Home from './Home';
import Search from './Home/Search';
import UserProfile from './UserProfile';
import PostPage from './UserProfile/PostPage';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreens = ({
	navigation,
	route,
}: BottomTabScreenProps<{}, 'HomeScreens'>) => {
	useLayoutEffect(() => {
		if (getFocusedRouteNameFromRoute(route) !== 'Home') {
			navigation.setOptions({ tabBarVisible: false });
		} else {

			navigation.setOptions({ tabBarVisible: true });
		}
	}, [navigation, route]);

	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='Home'
				component={Home}
				options={{ headerShown: false }}
			/>

			<HomeStack.Screen
				name='UserProfile'
				options={{ headerTransparent: true, headerTitle: '' }}
				component={UserProfile}
			/>
			<HomeStack.Screen
				name='PostPage'
				options={{ headerTitle: 'Post' }}
				component={PostPage}
			/>

			<HomeStack.Screen
				name='Search'
				options={{ headerTransparent: true, headerTitle: '' }}
				component={Search}
			/>
		</HomeStack.Navigator>
	);
};

export default function App() {
	const [friends, setFriends] = useState([
		{
			id: '1',
			name: 'User 1',
			username: 'user1username',
			profilePicture: './pup.jpeg',
			unreadPosts: 2,
			latestPost: {
				id: '11',
				content: [
					{
						type: 'text',
						content: 'hello world 1',
					},
				],
				updatedTime: 5,
			},
			bio: 'Aliqua proident reprehenderit occaecat irure ut.',
		},
		{
			id: '2',
			name: 'User 2',
			username: 'user2username',
			profilePicture: './pup.jpeg',
			unreadPosts: 13,

			latestPost: {
				id: '22',
				content: [
					{
						type: 'text',
						content: 'hello world 2',
					},
				],
				updatedTime: 4,
			},
			bio: 'Aliqua proident reprehenderit occaecat irure ut.',
		},
		{
			id: '3',
			name: 'User 3',
			username: 'user3username',
			profilePicture: './pup.jpeg',
			unreadPosts: 0,
			latestPost: {
				id: '33',
				content: [
					{
						type: 'image',
						content: 'hello world 3',
					},
				],
				updatedTime: 5,
			},
			bio: 'Aliqua proident reprehenderit occaecat irure ut.',
		},
		{
			id: '4',
			name: 'User 4',
			username: 'user4username',
			profilePicture: './pup.jpeg',
			unreadPosts: 0,
			latestPost: {
				id: '44',
				content: [
					{
						type: 'text',
						content:
							'hello world sjgsldfjsldfjs;dkfjs;fjs;ldjf sjdfjsdf sjdfk;sf jsdl;f4',
					},
				],
				updatedTime: 6,
			},
			bio: 'Aliqua proident reprehenderit occaecat irure ut.',
		},
	]);
	const [curUser, setCurUser] = useState({
		id: '9',
		name: 'Jas',
		username: 'jastronaut',
		profilePicture: './pup.jpeg',
		unreadPosts: 0,
		latestPost: {
			id: '99',
			content: [
				{
					type: 'text',
					content: 'hello world 9',
				},
			],
			updatedTime: 1,
		},

		bio: 'Aliqua proident reprehenderit occaecat irure ut.',
	});

	const findNextUser = (curIndex: number) => {
		if (curIndex >= friends.length - 1) return null;
		return friends[curIndex + 1];
	};

	const markFeedRead = (curIndex: number) => {
		const curUser = friends[curIndex];
		curUser.unreadPosts = 0;
		console.log(friends[curIndex].unreadPosts);
	};

	return (
		<AppContext.Provider
			value={{
				friends: friends,
				curUser: curUser,
				findNextUser: findNextUser,
				markFeedRead: markFeedRead,
			}}>
			<SafeAreaProvider>
				<NavigationContainer>
					<Tab.Navigator>
						<Tab.Screen
							name='HomeScreens'
							component={HomeStackScreens}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</AppContext.Provider>
	);
}
