import { useState, useEffect } from 'react';

import Form from 'components/form';

import { validateSearchForm } from 'utils/formValidations';

import styles from './index.module.scss';

const SearchContainer = () => {
	const [trip, setTrip] = useState({
		departure: '',
		destination: '',
		departureDate: '',
		returnDate: '',
	});
	const [formInvalid, setFormInvalid] = useState(true);

	const [ports, setPorts] = useState([
		{ text: 'Buenos aires', id: 1 },
		{ text: 'Panama', id: 2 },
		{ text: 'Brasil', id: 3 },
		{ text: 'Bucara', id: 4 },
		{ text: 'España', id: 5 },
		{ text: 'Francia', id: 6 },
		{ text: 'China', id: 7 },
	]);

	useEffect(() => {
		const formInvalid = !validateSearchForm(trip);
		setFormInvalid(formInvalid);
	}, [trip]);

	const handleItemSelected = (item, elem) => {
		const newTrip = { ...trip };
		newTrip[elem] = item;

		setTrip(newTrip);
	};

	const onSubmit = () => {};

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
				<Form.Submit disabled={formInvalid}>Search</Form.Submit>
			</Form>
		</section>
	);
};

export default SearchContainer;
