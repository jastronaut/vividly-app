import React, { useContext } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';

function Pen(props: SvgProps) {
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
			<Path d='M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z' />
		</Svg>
	);
}

export default Pen;
