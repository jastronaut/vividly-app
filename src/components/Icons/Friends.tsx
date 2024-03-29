import React, { useContext } from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';

function Friends(props: SvgProps) {
	const theme = useContext(ThemeContext);
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			stroke={theme.colors.muted.fg}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}>
			<Path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
			<Circle cx={9} cy={7} r={4} />
			<Path d='M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' />
		</Svg>
	);
}

export default Friends;
