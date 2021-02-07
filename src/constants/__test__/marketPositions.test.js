import { marketPositions } from '../marketPositions';

describe('Market Positions', () => {
	it('should return an object with the market positions', () => {
		const expectedEndpoint = {
			low: 'low',
			average: 'average',
			high: 'high',
		};
		expect(marketPositions).toEqual(expectedEndpoint);
	});
});
