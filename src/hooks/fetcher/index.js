import { useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import fetcher from 'utils/fetcher';

const useFetch = ({ method = 'get', url, data = null }) => {
	const [response, setResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const handleError = useErrorHandler();

	useEffect(() => {
		const fetchData = () => {
			fetcher({
				method,
				url,
				data: JSON.parse(data),
			})
				.then(res => {
					setResponse(res);
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
