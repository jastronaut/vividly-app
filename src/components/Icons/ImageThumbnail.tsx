import React, { useContext } from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { ThemeContext } from 'styled-components/native';

function ImageThumbnail(props: SvgProps) {
	const theme = useContext(ThemeContext);
	return (
		<Svg width={29} height={29} viewBox='0 0 29 29' fill='none' {...props}>
			<Path
				d='M4.778 27h19.444A2.778 2.778 0 0027 24.222V4.778A2.778 2.778 0 0024.222 2H4.778A2.778 2.778 0 002 4.778v19.444A2.778 2.778 0 004.778 27zm0 0l15.278-15.278L27 18.667M11.722 9.639a2.083 2.083 0 11-4.166 0 2.083 2.083 0 014.166 0z'
				stroke={theme.colors.main.fg}
				strokeWidth={3}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	);
}

export default ImageThumbnail;
