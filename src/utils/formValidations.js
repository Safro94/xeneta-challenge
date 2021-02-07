const validateSearchForm = ({ departure, destination }) => {
	if (!departure || !destination) {
		return false;
	}

	if (departure.code === destination.code) {
		return false;
	}

	return true;
};

export { validateSearchForm };
