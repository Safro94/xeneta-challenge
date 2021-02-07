import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { useFetch } from '../';
import axios from 'utils/axios';

jest.mock('utils/axios');

describe('Fetch Hook', () => {
	it('should return a response and loading', async () => {
		const data = { ports: [] };
		axios.get.mockImplementation(() => Promise.resolve({ data }));

		const { result } = renderHook(() =>
			useFetch({
				url: 'test',
			})
		);

		expect(result.current.response).toBeNull();
		expect(result.current.isLoading).toBeTruthy();

		await waitFor(() => {
			expect(axios.get).toBeCalledTimes(1);
			expect(axios.get.mock.calls[0][0]).toBe('test');

			expect(result.current.response).toEqual(data);
			expect(result.current.isLoading).toBeFalsy();
		});
	});
});
