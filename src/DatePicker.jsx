import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function DatePicker({ submit, isMobile }) {
	const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

	const handleChange = (newValue) => {
		setValue(newValue);
		submit();
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{isMobile ? (
				<MobileDatePicker
					inputFormat="MM/DD/YYYY"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			) : (
				<DesktopDatePicker
					inputFormat="MM/DD/YYYY"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			)}
		</LocalizationProvider>
	);
}
