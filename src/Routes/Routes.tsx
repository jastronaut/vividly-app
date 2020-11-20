import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ScreenLoadingIndicator from '../components/ScreenLoadingIndicator';
import Login from '../Login';
import Home from '../Home';
import Search from '../Home/Search';
import UserProfile from '../UserProfile';
import PostPage from '../PostPage';
import MyPage from '../UserProfile/MyPage';
import AppSettings from '../AppSettings';

import { AuthContext } from '../AuthProvider';
import { ThemeContext } from 'styled-components/native';
import FeedProvider from '../FeedProvider';

const HomeStack = createStackNavigator();

const Routes = () => {
	const { authState } = useContext(AuthContext);
	const { navHeaderStyles } = useContext(ThemeContext);

	return (
		<FeedProvider>
			<SafeAreaProvider>
				{authState.isAuthInitFinished ? (
					authState.authUser && authState.jwt ? (
						<NavigationContainer>
							<HomeStack.Navigator>
								<HomeStack.Screen
									name='Home'
									component={Home}
									options={{ headerShown: false }}
								/>
								<HomeStack.Screen
									name='AppSettings'
									component={AppSettings}
									options={navHeaderStyles}
								/>

								<HomeStack.Screen
									name='UserProfile'
									component={UserProfile}
									options={({ route }) => ({
										title: `${route.params.user.name}'s Page`,
										...navHeaderStyles,
									})}
								/>
								<HomeStack.Screen
									name='PostPage'
									options={{
										title: 'Post',
										...navHeaderStyles,
									}}
									component={PostPage}
								/>

								<HomeStack.Screen
									name='Search'
									options={{
										headerTransparent: true,
										headerTitle: '',
									}}
									component={Search}
								/>
							</HomeStack.Navigator>
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
