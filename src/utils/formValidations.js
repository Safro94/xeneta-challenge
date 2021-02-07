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

const errorCompare = (trip, message) => {
	const { departure, destination } = trip;

	const status = !departure && !destination ? true : false;

	return {
		message,
		status: !status && departure?.code === destination?.code,
	};
};

export { validateSearchForm, errorCompare };
