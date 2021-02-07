import { validateSearchForm } from '../formValidations';

describe('Search Form Validation', () => {
	let trip;

	beforeEach(() => {
		trip = {
			departure: { code: 10 },
			destination: { code: 7 },
			departureDate: '2021-05-03',
			returnDate: '2021-05-08',
		};
	});

	it('should return false if there is no departure', () => {
		trip.departure = null;

		const result = validateSearchForm(trip);

		expect(result).toBe(false);
	});

	it('should return false if there is no destination', () => {
		trip.destination = null;

		const result = validateSearchForm(trip);

		expect(result).toBe(false);
	});

	it('should return false if there is no departureDate', () => {
		trip.departureDate = null;

		const result = validateSearchForm(trip);

		expect(result).toBe(false);
	});

	it('should return false when departure.code equals destination.code', () => {
		trip.destination.code = 10;

		const result = validateSearchForm(trip);

		expect(result).toBe(false);
	});

	it('should return false when returnDate < departureDate', () => {
		trip.returnDate = '2021-04-03';

		const result = validateSearchForm(trip);

		expect(result).toBe(false);
	});

	it('should return true if it passed all the validations', () => {
		const result = validateSearchForm(trip);

		expect(result).toBe(true);
	});
});
