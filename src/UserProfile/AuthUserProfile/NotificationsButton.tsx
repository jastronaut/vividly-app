import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Bell from '../../components/Icons/Bell';

type Props = {
	hasUnreadNotifications: boolean;
};

export default ({ hasUnreadNotifications }: Props) => {
	const navigation = useNavigation();
	return (
		<Pressable onPress={() => navigation.navigate('Notifications')} style={{marginRight: 10}}>
			<Bell hasUnreadNotifications={hasUnreadNotifications}  />
		</Pressable>
	);
};
