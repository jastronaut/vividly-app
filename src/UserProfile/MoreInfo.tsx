import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Pressable, Animated } from 'react-native';

import { ProfileHeaderContext } from './ProfileHeaderProvider';
import Friends from '../components/Icons/Friends';
import Pen from '../components/Icons/Pen';

const Bio = styled.Text`
	color: ${({ theme }) => theme.colors.main.fg};
	z-index: 1000;
	opacity: 1;
`;

const EmptyBio = styled.Text`
	color: ${({ theme }) => theme.colors.muted.fg};
	font-style: italic;
`;

const InfoContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.main.bg};
	padding: 2%;
	z-index: 1000;
	opacity: 1;
	border-bottom-width: 2px;
	border-bottom-color: ${({ theme }) => theme.colors.border};
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
	display: flex;
	flex-direction: row;
`;

const InfoButton = styled.View<{ isPressed: boolean }>`
	margin-right: 5%;
	padding: 2%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${({ theme, isPressed }) =>
		isPressed ? theme.colors.muted.bg : theme.colors.main.bg};
`;

type Props = {
	bio: string;
	isAuthUser?: boolean;
};

const MoreInfo = (props: Props) => {
	const { isInfoShowing } = useContext(ProfileHeaderContext);
	const translateAnim = useRef(new Animated.Value(-100)).current;
	const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(
		false,
	);

	useEffect(() => {
		setIsAnimationFinished(false);
		if (isInfoShowing) {
			Animated.timing(translateAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(translateAnim, {
				toValue: -100,
				duration: 200,
				useNativeDriver: true,
			}).start();
			setTimeout(() => setIsAnimationFinished(true), 250);
		}
	}, [isInfoShowing, translateAnim]);

	if (isAnimationFinished) return null;

	return (
		<Backdrop>
			<Animated.View
				style={{ transform: [{ translateY: translateAnim }] }}>
				<InfoContainer>
					{props.bio.length ? (
						<Bio>{props.bio}</Bio>
					) : (
						<EmptyBio>This user hasn't written a bio yet!</EmptyBio>
					)}
					<Buttons>
						<Pressable>
							{({ pressed }) => (
								<InfoButton isPressed={pressed}>
									<Friends />
									<Bio>View Friends</Bio>
								</InfoButton>
							)}
						</Pressable>
						{props.isAuthUser ? (
							<Pressable>
								{({ pressed }) => (
									<InfoButton isPressed={pressed}>
										<Pen />
										<Bio>Edit Bio</Bio>
									</InfoButton>
								)}
							</Pressable>
						) : null}
					</Buttons>
				</InfoContainer>
			</Animated.View>
		</Backdrop>
	);
};

export default MoreInfo;
