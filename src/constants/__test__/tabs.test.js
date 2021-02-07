import { BENCHMARKS_TAB, TRENDS_TAB } from '../tabs';

describe('Tabs', () => {
	it('should return the benchmarks tab', () => {
		const expectedEndpoint = 'Benchmarks';
		expect(BENCHMARKS_TAB).toBe(expectedEndpoint);
	});

	it('should return the trends tab', () => {
		const expectedEndpoint = 'Trends';
		expect(TRENDS_TAB).toBe(expectedEndpoint);
	});
});
