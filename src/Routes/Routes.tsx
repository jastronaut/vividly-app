import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text } from 'react-native';

import Header from '../UserProfile/Header';
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
import ProfileProvider from '../UserProfile/ProfileProvider';
import ProfileHeaderProvider from '../UserProfile/ProfileHeaderProvider';

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
					headerBackTitleVisible: false,
					headerTitle: () => <Header {...route.params.user} />,
					...navHeaderStyles,
				})}
			/>

			<HomeStack.Screen
				name='AuthUserProfile'
				component={AuthUserProfile}
				options={{
					title: authUser.name,
					headerBackTitleVisible: false,
					headerTitle: () => <Header {...authUser} isAuthUser />,
					...navHeaderStyles,
				}}
			/>
			<HomeStack.Screen
				name='PostPage'
				options={{
					title: 'Post',
					headerBackTitle: 'Back',
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
			<ProfileProvider>
				<ProfileHeaderProvider>
					<SafeAreaProvider>
						<StatusBar
							barStyle={
								isLightMode ? 'dark-content' : 'light-content'
							}
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
											options={{
												headerBackTitle: 'Back',
												...navHeaderStyles,
											}}
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
				</ProfileHeaderProvider>
			</ProfileProvider>
		</FeedProvider>
	);
};

export default Routes;
