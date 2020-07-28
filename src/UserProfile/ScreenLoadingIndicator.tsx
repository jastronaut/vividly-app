import React from 'react';
import { ActivityIndicator } from 'react-native';

import { LoadingContainer } from './styles';

export default () => (
	<LoadingContainer>
		<ActivityIndicator size='large' />
	</LoadingContainer>
);
