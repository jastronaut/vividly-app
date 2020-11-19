import React, {
	ReactNode,
	createContext,
	useReducer,
	useCallback,
	useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider as SCThemeProvider } from 'styled-components/native';

const darkColors = {
	main: {
		text: '#fff',
		background: '#222',
	},
	muted: {
		text: '#aaa',
		background: '#333',
	},
	border: '#555',
};

const lightColors = {
	main: {
		text: '#222',
		background: '#fff',
	},
	muted: {
		text: '#555',
		background: '#eee',
	},
	border: '#ddd',
};

type ThemeState = {
	isLightMode: boolean;
	accentColor: string;
	colors: object;
};

type ThemeDispatchContextType = {
	state: ThemeState;
	toggleTheme: Function;
	setAccentColor: Function;
};

export const ThemeDispatchContext = createContext<ThemeDispatchContextType>({
	state: {
		isLightMode: true,
		colors: lightColors,
		accentColor: '#dd9e9e',
	},
	toggleTheme: () => null,
	setAccentColor: () => null,
});

enum THEME_ACTIONS {
	SET_ACCENT_COLOR,
	TOGGLE_THEME,
	SET_THEME,
}

type SetAccentColorAction = {
	type: typeof THEME_ACTIONS.SET_ACCENT_COLOR;
	payload: string;
};

type ToggleThemeAction = {
	type: typeof THEME_ACTIONS.TOGGLE_THEME;
	payload?: null;
};

type SetThemeAction = {
	type: typeof THEME_ACTIONS.SET_THEME;
	payload: boolean;
};

type ThemeActions = SetAccentColorAction | ToggleThemeAction | SetThemeAction;

function reducer(state: ThemeState, action: ThemeActions): ThemeState {
	switch (action.type) {
		case THEME_ACTIONS.SET_ACCENT_COLOR:
			return {
				...state,
				accentColor: action.payload,
			};
		case THEME_ACTIONS.TOGGLE_THEME:
			return state.isLightMode
				? {
						...state,
						isLightMode: false,
						colors: darkColors,
				  }
				: {
						...state,
						isLightMode: true,
						colors: lightColors,
				  };
		case THEME_ACTIONS.SET_THEME:
			return action.payload
				? {
						...state,
						isLightMode: true,
						colors: lightColors,
				  }
				: {
						...state,
						isLightMode: false,
						colors: darkColors,
				  };
		default:
			return state;
	}
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {
		isLightMode: true,
		colors: lightColors,
		accentColor: '#dd9e9e',
	});
	// TODO: load theme from storage on init
	useEffect(() => {
		const load = async () => {
			try {
				const colorModeReq = await AsyncStorage.getItem(
					'@theme.isLightMode',
				);
				const accentColor = await AsyncStorage.getItem(
					'@theme.accentColor',
				);

				if (colorModeReq) {
					const colorMode = JSON.parse(colorModeReq);
					dispatch({
						type: THEME_ACTIONS.SET_THEME,
						payload: colorMode,
					});
				} else {
					await AsyncStorage.setItem(
						'@theme.isLightMode',
						JSON.stringify(true),
					);
				}

				if (accentColor && accentColor.length) {
					dispatch({
						type: THEME_ACTIONS.SET_ACCENT_COLOR,
						payload: accentColor,
					});
				} else {
					await AsyncStorage.setItem('@theme.accentColor', '#dd9e9e');
				}
			} catch (_e) {}
		};

		load();
	}, []);

	const toggleTheme = useCallback(async () => {
		try {
			await AsyncStorage.setItem(
				'@theme.isLightMode',
				JSON.stringify(!state.isLightMode),
			);
			dispatch({
				type: THEME_ACTIONS.TOGGLE_THEME,
			});
		} catch (e) {
			console.log('Error: cant set theme');
			console.log(e);
		}
	}, [state.isLightMode]);

	const setAccentColor = (newColor: string) => {
		const storeAccentColor = async () => {
			try {
				await AsyncStorage.setItem('@theme.accentColor', newColor);
				dispatch({
					type: THEME_ACTIONS.SET_ACCENT_COLOR,
					payload: newColor,
				});
			} catch (e) {
				console.log('Error: cant set accent color');
				console.log(e);
			}
		};
		storeAccentColor();
	};

	return (
		<SCThemeProvider theme={state}>
			<ThemeDispatchContext.Provider
				value={{ state, toggleTheme, setAccentColor }}>
				{children}
			</ThemeDispatchContext.Provider>
		</SCThemeProvider>
	);
};

export default ThemeProvider;
