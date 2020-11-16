import styled from 'styled-components/native';

export const Title = styled.Text`
	font-size: 100px;
	text-align: center;
	margin-bottom: 5%;
`;

export const LoginContainer = styled.View`
	background-color: peachpuff;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 5%;
`;

export const CredentialsContainer = styled.View`
	background-color: white;
	border-radius: 15px;
	padding: 5% 5%;
`;

export const Input = styled.TextInput`
	border-radius: 10px;
	border: solid 2px #eee;
	padding: 5% 5%;
	font-size: 20px;
	margin-bottom: 5%;
`;

export const LoginPrompt = styled.Text`
	font-size: 25px;
	text-align: center;
	margin-bottom: 5%;
`;

interface SubmitButtonProps {
	isPressed: boolean;
}

export const SubmitButton = styled.View<SubmitButtonProps>`
	background-color: ${(props) => (props.isPressed ? '#507d10' : '#6a891d')};
	border-radius: 15px;
	padding: 5% 5%;
`;

export const SubmitText = styled.Text`
	font-size: 25px;
	color: white;
	text-align: center;
`;

export const ErrorText = styled.Text`
	margin-top: 5%;
	color: red;
	text-align: center;
`;
