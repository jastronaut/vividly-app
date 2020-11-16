import {
	createContext,
	useState,
	useEffect,
	useContext,
	useReducer,
} from 'react';
// import firebase from 'firebase/app';
// import { fbAuth } from '../config/Firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthUser } from '../types';

export const useProvideAuth = () => {
	// const [authUser, setAuthUser] = useState<firebase.User | null>(null);
	const [authUser, setAuthUser] = useState<AuthUser | null>(null);
	const [jwt, setJwt] = useState<string | null>(null);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const token = await AsyncStorage.getItem('@jwt');
				const userReq = await AsyncStorage.getItem('@authUser');
				if (!userReq) throw Error('ugh');
				const user = JSON.parse(userReq);
				console.log('get token from storage:', token);
				/*
				if (!token) return;

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
				setAuthUser(user);
				setJwt(token);
			} catch (e) {
				console.log('error: init user from app');
				console.log(e);
			}
		};

		loadUserData();
		// AsyncStorage.getItem('@authUser').then((val) =>
		// 	setAuthUser(val ? JSON.parse(val) : null),
		// );
		// console.log('**', fbAuth.currentUser, '**');
	}, []);

	const login = (username: string, password: string, callback: Function) => {
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
				console.log(loginResp);
				if (loginReq.status !== 200) {
					const errMsg = await loginResp.msg;
					console.log();
					throw Error(errMsg || 'unable to login');
				}

				const { jwtToken, user } = await loginResp;
				setAuthUser(user);
				setJwt(jwtToken);

				await AsyncStorage.setItem('@jwt', jwtToken);
				await AsyncStorage.setItem('@authUser', JSON.stringify(user));
			} catch (e) {
				console.log('error: cant login');
				console.log(e);
			}
		};

		attemptLogin();

		/*
		fbAuth.signInWithEmailAndPassword(email, password).then((userCred) => {
			if (!userCred.user) throw 'null user';

			console.log('=================');
			AsyncStorage.setItem(
				'@authUser',
				JSON.stringify(userCred.user),
			).then(() => setAuthUser(userCred.user));
			callback();
		});
		return authUser?.uid || null;
		*/
	};

	const logout = (callback: Function) => {
		const clearAuthStorage = async () => {
			try {
				await AsyncStorage.removeItem('@jwt');
				await AsyncStorage.removeItem('@authUser');
				setAuthUser(null);
				setJwt(null);
			} catch (e) {
				console.log('error: cant logout');
				console.log(e);
			}
		};
		clearAuthStorage();
		callback();
	};

	return {
		jwt,
		authUser,
		login,
		logout,
	};
};

type AuthContextType = {
	// authUser: firebase.User | null;
	jwt: string | null;
	authUser: AuthUser | null;
	login: Function;
	logout: Function;
};

export const AuthContext = createContext<AuthContextType>({
	jwt: null,
	authUser: null,
	login: () => null,
	logout: () => null,
});
