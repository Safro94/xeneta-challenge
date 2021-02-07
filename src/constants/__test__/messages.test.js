import { SEARCH_EQUAL_VALUES } from '../messages';

describe('Messages', () => {
	it('should return the equal values message', () => {
		const expectedEndpoint = '* Departure and destination cannot be the same';
		expect(SEARCH_EQUAL_VALUES).toBe(expectedEndpoint);
	});
});
