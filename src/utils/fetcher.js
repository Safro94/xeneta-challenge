import axios from 'utils/axios';

const fetcher = async ({ method = 'get', url, data = null }) => {
	return axios[method](url, JSON.parse(data)).then(
		response => response.data,
		error => {
			throw error;
		}
	);
};

export default fetcher;
