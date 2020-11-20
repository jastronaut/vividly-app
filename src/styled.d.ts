import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		accentColor: string;
		isLightMode: boolean;
		colors: {
			main: {
				fg: string;
				bg: string;
			};
			muted: {
				fg: string;
				bg: string;
			};
			border: string;
		};
		navHeaderStyles: {
			headerStyle: {
				backgroundColor: string;
			};
			headerTintColor: string;
			headerTitleStyle: {
				color: string;
			};
		};
	}
}
