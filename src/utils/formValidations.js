const validateSearchForm = ({
	departure,
	destination,
	departureDate,
	returnDate,
}) => {
	if (!departure || !destination || !departureDate) {
		return false;
	}

	if (departure.code === destination.code) {
		return false;
	}

	if (returnDate && returnDate < departureDate) {
		return false;
	}

	return true;
};

export { validateSearchForm };
