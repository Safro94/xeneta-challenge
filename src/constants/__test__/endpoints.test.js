import { PORTS_ENDPOINT, RATES_ENDPOINT } from '../endpoints';

describe('Endpoints', () => {
	it('should return the ports endpoint', () => {
		const expectedEndpoint = '/api/ports';
		expect(PORTS_ENDPOINT).toBe(expectedEndpoint);
	});

	it('should return the rates endpoint', () => {
		const expectedEndpoint = '/api/rates';
		expect(RATES_ENDPOINT).toBe(expectedEndpoint);
	});
});
