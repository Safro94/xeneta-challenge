const removeAccents = value => {
	const map = {
		a: 'á|à|ã|â',
		e: 'é|è|ê',
		i: 'í|ì|î',
		o: 'ó|ò|ô|õ',
		u: 'ú|ù|û|ü',
	};

	for (let pattern in map) {
		value = value.replace(new RegExp(map[pattern], 'g'), pattern);
	}

	return value;
};

export { removeAccents };
