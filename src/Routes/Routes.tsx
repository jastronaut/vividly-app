import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import ScreenLoadingIndicator from '../components/ScreenLoadingIndicator';
import Login from '../Login';
import Home from '../Home';
import UserProfile from '../UserProfile';
import AuthUserProfile from '../UserProfile/AuthUserProfile';
import PostPage from '../PostPage';
import AppSettings from '../AppSettings';
import AddPost from '../UserProfile/AuthUserProfile/AddPost';

import { AuthContext } from '../AuthProvider';
import { ThemeContext } from 'styled-components/native';
import FeedProvider from '../FeedProvider';

const HomeStack = createStackNavigator();
const RootStack = createStackNavigator();

const HomeRoutes = () => {
	const { authUser } = useContext(AuthContext).authState;
	const { navHeaderStyles } = useContext(ThemeContext);
	if (!authUser) return null;

	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='Home'
				component={Home}
				options={{ headerShown: false }}
			/>
			<HomeStack.Screen
				name='AppSettings'
				component={AppSettings}
				options={{ title: 'App Settings', ...navHeaderStyles }}
			/>

			<HomeStack.Screen
				name='UserProfile'
				component={UserProfile}
				options={({ route }) => ({
					title: `${route.params.user.name}`,
					...navHeaderStyles,
				})}
			/>

			<HomeStack.Screen
				name='AuthUserProfile'
				component={AuthUserProfile}
				options={{
					title: authUser.name,
					...navHeaderStyles,
				}}
			/>
			<HomeStack.Screen
				name='PostPage'
				options={{
					title: 'Post',
					...navHeaderStyles,
				}}
				component={PostPage}
			/>
		</HomeStack.Navigator>
	);
};

const Routes = () => {
	const { authState } = useContext(AuthContext);
	const { navHeaderStyles, isLightMode } = useContext(ThemeContext);

	return (
		<FeedProvider>
			<SafeAreaProvider>
				<StatusBar
					barStyle={isLightMode ? 'dark-content' : 'light-content'}
				/>
				{authState.isAuthInitFinished ? (
					authState.authUser && authState.jwt ? (
						<NavigationContainer>
							<RootStack.Navigator mode='modal'>
								<RootStack.Screen
									name='Main'
									component={HomeRoutes}
									options={{ headerShown: false }}
								/>
								<RootStack.Screen
									name='AddPost'
									component={AddPost}
									options={{headerBackTitle: 'Back', ...navHeaderStyles }}
								/>
							</RootStack.Navigator>
						</NavigationContainer>
					) : (
						<Login />
					)
				) : (
					<ScreenLoadingIndicator />
				)}
			</SafeAreaProvider>
		</FeedProvider>
	);
};

export default Routes;
