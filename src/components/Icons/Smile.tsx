import React, { useContext } from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';

function Smile(props: SvgProps) {
	const theme = useContext(ThemeContext);
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='#f2cc50'
			stroke='#111'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}>
			<Circle cx={12} cy={12} r={10} />
			<Path d='M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01' />
		</Svg>
	);
}

export default Smile;
