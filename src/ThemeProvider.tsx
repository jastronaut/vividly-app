import React, {
	ReactNode,
	createContext,
	useReducer,
	useCallback,
	useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeProvider as SCThemeProvider } from 'styled-components/native';

const DEFAULT_ACCENT_COLOR = '#dd9e9e';

const darkColors = {
	main: {
		fg: '#fff',
		bg: '#222',
	},
	muted: {
		fg: '#aaa',
		bg: '#333',
	},
	border: '#555',
};

const lightColors = {
	main: {
		fg: '#222',
		bg: '#fff',
	},
	muted: {
		fg: '#555',
		bg: '#eee',
	},
	border: '#ddd',
};

type ThemeState = {
	isLightMode: boolean;
	accentColor: string;
	colors: object;
	navHeaderStyles: object;
};

type ThemeDispatchContextType = {
	state: ThemeState;
	toggleTheme: Function;
	setAccentColor: Function;
};

const makeInitialThemState = () => {
	return {
		isLightMode: true,
		colors: lightColors,
		accentColor: DEFAULT_ACCENT_COLOR,
		navHeaderStyles: {
			headerStyle: {
				backgroundColor: lightColors.main.bg,
			},
			headerTintColor: DEFAULT_ACCENT_COLOR,
			headerTitleStyle: {
				color: lightColors.main.fg,
			},
		},
	};
};

export const ThemeDispatchContext = createContext<ThemeDispatchContextType>({
	state: makeInitialThemState(),
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
						navHeaderStyles: {
							headerStyle: {
								backgroundColor: darkColors.main.bg,
							},
							headerTintColor: state.accentColor,
							headerTitleStyle: {
								color: darkColors.main.fg,
							},
						},
				  }
				: {
						...state,
						isLightMode: true,
						colors: lightColors,
						navHeaderStyles: {
							headerStyle: {
								backgroundColor: lightColors.main.bg,
							},
							headerTintColor: state.accentColor,
							headerTitleStyle: {
								color: lightColors.main.fg,
							},
						},
				  };
		case THEME_ACTIONS.SET_THEME:
			return action.payload
				? {
						...state,
						isLightMode: true,
						colors: lightColors,
						navHeaderStyles: {
							headerStyle: {
								backgroundColor: lightColors.main.bg,
							},
							headerTintColor: state.accentColor,
							headerTitleStyle: {
								color: lightColors.main.fg,
							},
						},
				  }
				: {
						...state,
						isLightMode: false,
						colors: darkColors,
						navHeaderStyles: {
							headerStyle: {
								backgroundColor: darkColors.main.bg,
							},
							headerTintColor: state.accentColor,
							headerTitleStyle: {
								color: darkColors.main.fg,
							},
						},
				  };
		default:
			return state;
	}
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, makeInitialThemState());
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
					await AsyncStorage.setItem(
						'@theme.accentColor',
						DEFAULT_ACCENT_COLOR,
					);
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
