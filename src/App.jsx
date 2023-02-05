import React, { useState } from 'react';
import Gallery from './Gallery';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DatePicker from './DatePicker';
import Stack from '@mui/material/Stack';

const App = () => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'));
	const isXl = useMediaQuery(theme.breakpoints.up('lg'));
	const wrapperStyle = isXl ? { display: 'flex', justifyContent: 'center' } : {};

	const [isReload, setIsReload] = useState(false);
	const reload = () => {
		setIsReload((isReload) => !isReload);
	};

	return (
		<Box sx={wrapperStyle}>
			<Stack spacing={7}>
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						zIndex: 10,
						backgroundColor: '#8AE9F0',
						width: '100%',
						display: 'flex',
						borderBottom: '3px solid white',
						justifyContent: 'center',
					}}
				>
					<DatePicker submit={reload} isMobile={isSm} />
				</Box>
				<Gallery isReload={isReload} />
			</Stack>
		</Box>
	);
};

export default App;
