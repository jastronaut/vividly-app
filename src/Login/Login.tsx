import React, { useState, useContext } from 'react';
import { Pressable } from 'react-native';

import { AuthContext } from '../hooks/useAuth';

import {
	LoginContainer,
	Title,
	CredentialsContainer,
	Input,
	LoginPrompt,
	SubmitButton,
	SubmitText,
	ErrorText,
} from './styles';
import ScreenLoadingIndicator from '../UserProfile/ScreenLoadingIndicator';

const Login = () => {
	const { login } = useContext(AuthContext);

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const attemptLogin = () => {
		if (!username || !password) {
			setErrorMessage('Please fill out all fields!');
			return;
		}

		setIsLoading(true);
		try {
			login(username, password, () => null);
		} catch (_e) {
			setErrorMessage(
				"Couldn't login at this time. Please try again later",
			);
		}
		setIsLoading(false);
	};

	return (
		<>
			{isLoading ? <ScreenLoadingIndicator /> : null}
			<LoginContainer>
				<Title>🍑</Title>
				<CredentialsContainer>
					<LoginPrompt>Log into your peached account</LoginPrompt>
					<Input
						onChangeText={(text) => setUsername(text.trim())}
						value={username}
						autoCompleteType='username'
						autoCorrect={false}
						placeholder='username'
						textContentType='username'
						autoCapitalize='none'
						editable={!isLoading}
					/>
					<Input
						onChangeText={(text) => setPassword(text)}
						value={password}
						autoCompleteType='password'
						autoCorrect={false}
						secureTextEntry={true}
						placeholder='password'
						textContentType='password'
						autoCapitalize='none'
						editable={!isLoading}
					/>

					<Pressable onPress={attemptLogin}>
						{({ pressed }) => (
							<SubmitButton isPressed={pressed}>
								<SubmitText>Submit</SubmitText>
							</SubmitButton>
						)}
					</Pressable>

					{errorMessage ? (
						<ErrorText>{errorMessage}</ErrorText>
					) : null}
				</CredentialsContainer>
			</LoginContainer>
		</>
	);
};

export default Login;
