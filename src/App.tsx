import React from 'react';

import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';

import Routes from './Routes';

export default function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Routes />
			</ThemeProvider>
		</AuthProvider>
	);
}
