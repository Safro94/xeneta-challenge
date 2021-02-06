const validateSearchForm = trip => {
	const { departure, destination, departureDate, returnDate } = trip;

	if (!departure || !destination || !departureDate) {
		return false;
	}

	if (departure.id === destination.id) {
		return false;
	}

	if (returnDate && returnDate < departureDate) {
		return false;
	}

	return true;
};

export { validateSearchForm };
