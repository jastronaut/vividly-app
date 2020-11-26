import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Pressable, Animated } from 'react-native';

import { ProfileHeaderContext } from './ProfileHeaderProvider';
import Friends from '../components/Icons/Friends';

const Bio = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
	z-index: 1000;
	opacity: 1;
`;

const InfoContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.main.bg};
	padding: 2%;
	z-index: 1000;
	opacity: 1;
`;

const Backdrop = styled.View`
	position: absolute;
	/* background-color: black; */
	height: 110%;
	width: 120%;
	top: 0;
	z-index: 998;
`;

const Buttons = styled.View`
	margin-top: 1%;
`;

const InfoButton = styled.View<{ isPressed: boolean }>`
	margin-right: 5%;
	padding: 2%;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 25%;
	justify-content: space-between;
	background-color: ${({ theme, isPressed }) =>
		isPressed ? theme.colors.muted.bg : theme.colors.main.bg};
`;

type Props = {
	bio: string;
};

const MoreInfo = (props: Props) => {
	const { isInfoShowing } = useContext(ProfileHeaderContext);
	const heightAnim = useRef(new Animated.Value(0)).current;
	const translateAnim = useRef(new Animated.Value(-100)).current;
	const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(
		false,
    );

	useEffect(() => {
		setIsAnimationFinished(false);
		if (isInfoShowing) {
			Animated.timing(translateAnim, {
				toValue: 0,
				duration: 150,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(translateAnim, {
				toValue: -100,
				duration: 150,
				useNativeDriver: true,
			}).start();
        }
        setTimeout(() => setIsAnimationFinished(true), 200);
    }, [isInfoShowing, translateAnim]);


	return (
			<Backdrop>
				<Animated.View style={{ transform: [{ translateY: translateAnim }] }}>
					<InfoContainer>
						<Bio>{props.bio}</Bio>
						<Buttons>
							<Pressable>
								{({ pressed }) => (
									<InfoButton isPressed={pressed}>
										<Friends />
										<Bio>Friends</Bio>
									</InfoButton>
								)}
							</Pressable>
						</Buttons>
					</InfoContainer>
				</Animated.View>
			</Backdrop>
	);
};

export default MoreInfo;
