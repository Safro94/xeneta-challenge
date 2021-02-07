import fetcher from '../fetcher';
import axios from 'utils/axios';

jest.mock('utils/axios');

describe('Fetcher', () => {
	it('should return a response', async () => {
		const data = { ports: [] };
		axios.get.mockImplementation(() => Promise.resolve({ data }));

		const result = await fetcher({
			url: 'test',
		});

		expect(axios.get).toBeCalledTimes(1);
		expect(axios.get.mock.calls[0][0]).toBe('test');
		expect(result).toEqual(data);
	});
});
