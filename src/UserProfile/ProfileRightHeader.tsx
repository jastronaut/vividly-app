import React, { useContext } from 'react';
import { Text, View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Info from '../components/Icons/Info';
import { ProfileHeaderContext } from './ProfileHeaderProvider';
import NotificationsButton from './AuthUserProfile/NotificationsButton';
import FriendsButton from './FriendsButton';

const IconsContainer = styled.View`
	display: flex;
	flex-direction: row;
    align-items: center;
`;

type Props = {
    isAuthUserPage?: boolean;
    hasUnreadNotifications?: boolean;
}

export default ({ isAuthUserPage=false, hasUnreadNotifications=false}: Props) => {
	const { toggleInfoShowing } = useContext(ProfileHeaderContext);
	return (
		<IconsContainer>
			<Pressable onPress={() => toggleInfoShowing()}>
				<Info style={{marginRight: 10}} />
			</Pressable>
            {
                isAuthUserPage ? <NotificationsButton hasUnreadNotifications={hasUnreadNotifications} /> : <FriendsButton />
            }
		</IconsContainer>
	);
};
