import React from 'react';

export const DateRangePicker = ({ onStartDateChange, onEndDateChange, id }) => {
	const handleStartChange = () => {
		onStartDateChange('2020-10-01', 'departure');
	};

	const handleEndChange = () => {
		onEndDateChange('2020-11-01', 'destination');
	};
	return (
		<>
			<input
				type='text'
				placeholder='Start date'
				onChange={handleStartChange}
			/>
			<input type='text' placeholder='End date' onChange={handleEndChange} />
		</>
	);
};

module.exports = {
	DateRangePicker,
	START_DATE: '',
	END_DATE: '',
};
