import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Form from 'components/form';

import { useFetch } from 'hooks/fetcher';
import { useBenchmarks } from 'hooks/benchmarks';

import { validateSearchForm } from 'utils/formValidations';
import fetcher from 'utils/fetcher';

import { PORTS_ENDPOINT, RATES_ENDPOINT } from 'constants/endpoints';

import styles from './index.module.scss';

const SearchContainer = () => {
	const { response: ports } = useFetch({ url: PORTS_ENDPOINT });
	const { setGraphData, setPeriod } = useBenchmarks();

	const [formInvalid, setFormInvalid] = useState(true);
	const handleError = useErrorHandler();

	const [trip, setTrip] = useState({
		departure: null,
		destination: null,
		departureDate: '',
		returnDate: '',
	});

	useEffect(() => {
		const formInvalid = !validateSearchForm(trip);
		setFormInvalid(formInvalid);
	}, [trip]);

	const handleItemSelected = (item, elem) => {
		const newTrip = { ...trip };
		newTrip[elem] = item;

		setTrip(newTrip);
	};

	const onSubmit = e => {
		e.preventDefault();
		fetcher({
			url: `${RATES_ENDPOINT}/${trip.departure?.code}/${trip.destination?.code}`,
		}).then(
			res => {
				setGraphData(res);
				setPeriod({
					departureDate: trip.departureDate,
					returnDate: trip.returnDate,
				});
			},
			error => handleError(error)
		);
	};

	return (
		<section>
			<Form className={styles.form} onSubmit={onSubmit} method='POST'>
				<Form.Autocomplete
					placeholder='Departure'
					value={trip.departure}
					source={ports}
					onSelectItem={handleItemSelected}
					onBlurSelected
					id='departure'
				/>
				<Form.Autocomplete
					placeholder='Destination'
					value={trip.destination}
					source={ports}
					onSelectItem={handleItemSelected}
					onBlurSelected
					id='destination'
				/>
				<Form.Datepicker onSelectItem={handleItemSelected} />
				<Form.Submit disabled={formInvalid}>Search</Form.Submit>
			</Form>
		</section>
	);
};

export default SearchContainer;
