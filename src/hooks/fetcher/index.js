import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import axios from 'utils/axios';

const useFetch = ({ method = 'get', url, data = null }) => {
	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const handleError = useErrorHandler();

	useEffect(() => {
		const fetchData = () => {
			axios[method](url, JSON.parse(data))
				.then(res => {
					setResponse(res.data);
				}, handleError)
				.finally(() => {
					setIsLoading(false);
				});
		};

		fetchData();
	}, [method, url, data, handleError]);

	return { response, isLoading };
};

export { useFetch };
