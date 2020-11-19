import React, { useState, useContext } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

import Button from '../components/Button';

import { AuthContext } from '../AuthProvider';
import { ThemeDispatchContext } from '../ThemeProvider';

import { SafeAreaView } from 'react-native-safe-area-context';

const AppSettings = () => {
	const { toggleTheme } = useContext(ThemeDispatchContext);
	const { authState, logout } = useContext(AuthContext);
	const { authUser } = authState;

	const [newDisplayName, setNewDisplayName] = useState<string>('');
	const [errorText, setErrorText] = useState<string | null>(null);

	const changeUserSettings = () => {
		if (!newDisplayName) return;
	};

	if (!authUser) return;

	return (
		<SafeAreaView>
			<View>
				<Text>Change display name</Text>
				<Text>Current display name: [{authUser.name}]</Text>

				<TextInput
					placeholder='New display name'
					onChangeText={(text) => setNewDisplayName(text.trim())}
				/>

				<Button onPress={changeUserSettings}>Submit</Button>

				<Button onPress={() => logout(() => null)}>Logout</Button>

				<Button onPress={() => toggleTheme()}>Toggle theme</Button>
			</View>
		</SafeAreaView>
	);
};

export default AppSettings;
