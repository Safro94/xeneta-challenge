import { HOME } from '../routes';

describe('Routes', () => {
	it('should return the home route', () => {
		const expectedEndpoint = '/';
		expect(HOME).toBe(expectedEndpoint);
	});
});
