import React, { useContext } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';

type HeartProps = {
	isLiked: boolean;
};

export function Heart({ isLiked, ...rest }: SvgProps & HeartProps) {
	const theme = useContext(ThemeContext);
	return (
		<Svg
			width={15}
			height={15}
			viewBox='0 0 24 24'
			fill={isLiked ? theme.accentColor : 'none'}
			stroke={isLiked ? theme.accentColor : theme.colors.muted.fg}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...rest}>
			<Path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' />
		</Svg>
	);
}
