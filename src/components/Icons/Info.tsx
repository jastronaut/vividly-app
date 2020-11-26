import React, { useContext } from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

import { ThemeContext } from 'styled-components/native';

function Info(props: SvgProps) {
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
			<Circle cx={12} cy={12} r={10} />
			<Path d='M12 16v-4M12 8h.01' />
		</Svg>
	);
}

export default Info;
