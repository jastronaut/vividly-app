import React, { useContext } from 'react';

import Button from '../components/Button';

import { AuthContext } from '../AuthProvider';
import { ThemeDispatchContext } from '../ThemeProvider';

import { ScreenContainer } from '../styles';

const AppSettings = () => {
	const { toggleTheme } = useContext(ThemeDispatchContext);
	const { authState, logout } = useContext(AuthContext);
	const { authUser } = authState;

	if (!authUser) return null;

	return (
		<ScreenContainer>
			<Button onPress={() => logout(() => null)}>Logout</Button>

			<Button onPress={() => toggleTheme()}>Toggle theme</Button>
		</ScreenContainer>
	);
};

export default AppSettings;
