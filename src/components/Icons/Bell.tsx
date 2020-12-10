import React, { useContext } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';

type Props = {
	hasUnreadNotifications: boolean;
}

function Bell(props: Props & SvgProps) {
	const theme = useContext(ThemeContext);
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill={props.hasUnreadNotifications ? theme.accentColor : theme.colors.muted.fg}
			stroke={props.hasUnreadNotifications ? theme.accentColor : theme.colors.muted.fg}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}>
			<Path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0' />
		</Svg>
	);
}

export default Bell;
