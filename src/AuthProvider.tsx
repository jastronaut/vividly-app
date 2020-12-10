import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthUser, Post } from './types';
import { mockAuthUser, testToken } from './mockData';

type AuthState = {
	authUser: AuthUser | null;
	jwt: string | null;
	isAuthLoading: boolean;
	isAuthInitFinished: boolean;
};

type AuthContextType = {
	authState: AuthState;
	login: Function;
	logout: Function;
};

export const AuthContext = createContext<AuthContextType>({
	authState: {
		jwt: null,
		authUser: null,
		isAuthLoading: false,
		isAuthInitFinished: false,
	},
	login: () => null,
	logout: () => null,
});

enum AUTH_ACTIONS {
	GET_USER,
	AUTH_LOADING,
	AUTH_INIT_FINISHED,
}

type GetUserAction = {
	type: typeof AUTH_ACTIONS.GET_USER;
	payload: Omit<AuthState, 'isAuthLoading' | 'isAuthInitFinished'>;
};

type AuthLoadingAction = {
	type: typeof AUTH_ACTIONS.AUTH_LOADING;
	payload?: null;
};

type AuthInitFinishedAction = {
	type: typeof AUTH_ACTIONS.AUTH_INIT_FINISHED;
	payload?: null;
};

type AuthActions = GetUserAction | AuthLoadingAction | AuthInitFinishedAction;

function reducer(state: AuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case AUTH_ACTIONS.GET_USER:
			return {
				...state,
				...action.payload,
				isAuthLoading: false,
			};
		case AUTH_ACTIONS.AUTH_LOADING:
			return {
				...state,
				isAuthLoading: true,
			};
		case AUTH_ACTIONS.AUTH_INIT_FINISHED:
			return {
				...state,
				isAuthInitFinished: true,
				isAuthLoading: false,
			};
		default:
			return state;
	}
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, authDispatch] = useReducer(reducer, {
		authUser: null,
		jwt: null,
		isAuthLoading: false,
		isAuthInitFinished: false,
	});

	useEffect(() => {
		authDispatch({
			type: AUTH_ACTIONS.AUTH_LOADING,
		});
		const loadJwtUserFromStorage = async () => {
			try {
				const token = await AsyncStorage.getItem('@jwt');
				/*
				// TODO: remove
				const storageUser = await AsyncStorage.getItem('@authUser');
				if (!storageUser || !token) {
					throw Error('no user or token in storage');
				}
				const user = JSON.parse(storageUser);
				*/
				if (!token) {
					throw Error('no token in storage');
				}

				const initInfoReq = await fetch(
					'http://127.0.0.1:1337/v0/users/self',
					{
						method: 'GET',
						headers: {
							'x-auth-token': token,
						},
					},
				);

				const initInfoResp = await initInfoReq.json();

				if (initInfoReq.status !== 200) {
					// TODO: need to figure out what to do here if this doesnt work
					// what to do if (1) offline or (2) jwt expires
					throw Error('cannot make init request');
				}

				const user = await initInfoResp.user;

				authDispatch({
					type: AUTH_ACTIONS.GET_USER,
					payload: {
						authUser: user,
						jwt: token,
					},
				});
			} catch (e) {
				console.log('Error: cant load init data from storage');
				console.log(e);
			} finally {
				authDispatch({
					type: AUTH_ACTIONS.AUTH_INIT_FINISHED,
				});
			}
		};

		loadJwtUserFromStorage();
	}, []);

	const login = (username: string, password: string) => {
		authDispatch({
			type: AUTH_ACTIONS.AUTH_LOADING,
		});

		const attemptLogin = async () => {
			try {
				const loginReq = await fetch(
					'http://127.0.0.1:1337/v0/auth/login',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							username,
							password,
						}),
					},
				);

				const loginResp = await loginReq.json();
				if (loginReq.status !== 200) {
					const errMsg = await loginResp.msg;
					throw Error(errMsg || 'unable to login');
				}

				const { jwtToken, user } = await loginResp;

				await AsyncStorage.setItem('@jwt', jwtToken);
				await AsyncStorage.setItem('@authUser', JSON.stringify(user));

				authDispatch({
					type: AUTH_ACTIONS.GET_USER,
					payload: {
						authUser: user,
						jwt: jwtToken,
					},
				});
			} catch (e) {
				console.log('error: cant login');
				console.log(e);
			}
		};
		attemptLogin();

		/*
		const fakeLogin = async () => {
			await AsyncStorage.setItem('@jwt', testToken);
			await AsyncStorage.setItem(
				'@authUser',
				JSON.stringify(mockAuthUser),
			);

			authDispatch({
				type: AUTH_ACTIONS.GET_USER,
				payload: {
					authUser: mockAuthUser,
					jwt: testToken,
				},
			});
		};

		fakeLogin();
		*/
	};

	const logout = () => {
		const clearAuthStorage = async () => {
			try {
				await AsyncStorage.removeItem('@jwt');
				await AsyncStorage.removeItem('@authUser');
				authDispatch({
					type: AUTH_ACTIONS.GET_USER,
					payload: {
						authUser: null,
						jwt: null,
					},
				});
			} catch (e) {
				console.log('error: cant logout');
				console.log(e);
			}
		};
		clearAuthStorage();
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
