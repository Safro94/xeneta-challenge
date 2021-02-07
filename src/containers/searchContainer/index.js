import { useState, useEffect } from 'react';

import Form from 'components/form';

import { useFetch } from 'hooks/fetcher';

import { validateSearchForm } from 'utils/formValidations';

import { PORTS_ENDPOINT } from 'constants/endpoints';

import styles from './index.module.scss';

const SearchContainer = () => {
	const { response: ports } = useFetch({ url: PORTS_ENDPOINT });

	const [formInvalid, setFormInvalid] = useState(true);
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
