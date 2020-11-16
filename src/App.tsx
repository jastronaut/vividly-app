import React from 'react';

import { useProvideAuth, AuthContext } from './hooks/useAuth';

import Routes from './Routes';

export default function App() {
	const auth = useProvideAuth();

	return (
		<AuthContext.Provider value={auth}>
			<Routes />
		</AuthContext.Provider>
	);
}
