import { useState } from 'react';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

import PropTypes from 'prop-types';

import styles from './index.module.scss';
import './overrides.css';

const DATE_FORMAT = 'yyyy-MM-dd';

const Datepicker = ({
	onSelectItem,
	placeholderStart,
	placeholderEnd,
	...rest
}) => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const formatDate = date => format(date, DATE_FORMAT);

	const handleDateChange = (date, id, stateUpdater) => {
		stateUpdater(date);

		const formattedDate = formatDate(date);
		onSelectItem(formattedDate, id);
	};

	return (
		<DateRangePicker
			startDate={startDate}
			endDate={endDate}
			onStartDateChange={date =>
				handleDateChange(date, 'departureDate', setStartDate)
			}
			onEndDateChange={date => handleDateChange(date, 'returnDate', setEndDate)}
			minimumDate={new Date()}
			minimumLength={1}
			format='dd-MM-yyyy'
			locale={es}
			{...rest}
		>
			{({ startDateInputProps, endDateInputProps, focus }) => (
				<div className={styles.inputsContainer}>
					<input
						className={
							focus === START_DATE
								? `${styles.input} ${styles.focus}`
								: styles.input
						}
						{...startDateInputProps}
						placeholder={placeholderStart}
					/>
					<input
						className={
							focus === END_DATE
								? `${styles.input} ${styles.focus}`
								: styles.input
						}
						{...endDateInputProps}
						placeholder={placeholderEnd}
					/>
				</div>
			)}
		</DateRangePicker>
	);
};

Datepicker.defaultProps = {
	placeholderStart: 'Start date',
	placeholderEnd: 'End date',
};

Datepicker.prototypes = {
	onSelectItem: PropTypes.func,
	placeholderStart: PropTypes.string,
	placeholderEnd: PropTypes.string,
};

export default Datepicker;
