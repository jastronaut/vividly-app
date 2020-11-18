import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthUser } from './types';

type AuthState = {
	authUser: AuthUser | null;
	jwt: string | null;
	isAuthLoading: boolean;
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
	},
	login: () => null,
	logout: () => null,
});

enum AUTH_ACTIONS {
	GET_USER,
	AUTH_LOADING,
}

type GetUserAction = {
	type: typeof AUTH_ACTIONS.GET_USER;
	payload: Omit<AuthState, 'isAuthLoading'>;
};

type AuthLoadingAction = {
	type: typeof AUTH_ACTIONS.AUTH_LOADING;
	payload?: null;
};

type AuthActions = GetUserAction | AuthLoadingAction;

function reducer(state: AuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case AUTH_ACTIONS.GET_USER:
			return {
				...action.payload,
				isAuthLoading: false,
			};
		case AUTH_ACTIONS.AUTH_LOADING:
			return {
				...state,
				isAuthLoading: true,
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
	});

	useEffect(() => {
		authDispatch({
			type: AUTH_ACTIONS.AUTH_LOADING,
		});
		const loadJwtUserFromStorage = async () => {
			try {
				const token = await AsyncStorage.getItem('@jwt');
				// TODO: remove
				const storageUser = await AsyncStorage.getItem('@authUser');
				if (!storageUser || !token) {
					throw Error('no user or token in storage');
				}
				const user = JSON.parse(storageUser);

				/*
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
				*/

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
			}
		};

		loadJwtUserFromStorage();
	}, []);

	const login = (username: string, password: string) => {
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
		// attemptLogin();

		authDispatch({
			type: AUTH_ACTIONS.GET_USER,
			payload: {
				authUser: {
					id: '0',
					name: 'Very Cool User ✨',
					username: 'coolestusername',
					bio: "I love using Peached even if it doesn't work",
					profilePicture: '',
					emailVerified: true,
					email: 'test@test.com',
					blockedWords: [],
					friends: [],
				},
				jwt: 'Fake.JWT.Lol',
			},
		});
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
