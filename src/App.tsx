import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';

import Routes from './Routes';

export default function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<ActionSheetProvider>
					<Routes />
				</ActionSheetProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}
