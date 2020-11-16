import React, { useState, useContext } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

import Button from '../components/Button';

import { AuthContext } from '../hooks/useAuth';

import { SafeAreaView } from 'react-native-safe-area-context';

const AppSettings = () => {
	const { authUser, logout } = useContext(AuthContext);

	const [newDisplayName, setNewDisplayName] = useState<string>('');
	const [errorText, setErrorText] = useState<string | null>(null);

	const changeUserSettings = () => {
		if (!newDisplayName) return;
		authUser
			?.updateProfile({
				displayName: newDisplayName,
			})
			.then(() => {
				console.log('name changed');
			})
			.catch((err) => {
				setErrorText('cant change name');
				console.log(err);
			});
	};

	return (
		<SafeAreaView>
			<View>
				<Text>Change display name</Text>
				<Text>Current display name: [{authUser?.displayName}]</Text>

				<TextInput
					placeholder='New display name'
					onChangeText={(text) => setNewDisplayName(text.trim())}
				/>

				<Button onPress={changeUserSettings}>Submit</Button>

				<Button onPress={() => logout(() => null)}>Logout</Button>
			</View>
		</SafeAreaView>
	);
};

export default AppSettings;
