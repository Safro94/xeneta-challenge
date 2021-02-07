import groupBy from '../groupBy';

describe('Group by', () => {
	it('should return an object low, average and high keys with data', () => {
		const data = [
			{ day: '2021-02-01', low: 100, mean: 200, high: 300 },
			{ day: '2021-03-01', low: 200, mean: 300, high: 400 },
			{ day: '2021-04-01', low: 300, mean: 400, high: 500 },
			{ day: '2021-05-01', low: 400, mean: 500, high: 600 },
			{ day: '2021-03-01', low: 500, mean: 600, high: 700 },
			{ day: '2021-01-01', low: 600, mean: 700, high: 800 },
		];

		const expectedEndpoint = {
			low: [
				{ x: '2021-02-01', y: 100 },
				{ x: '2021-03-01', y: 200 },
				{ x: '2021-04-01', y: 300 },
				{ x: '2021-05-01', y: 400 },
				{ x: '2021-03-01', y: 500 },
				{ x: '2021-01-01', y: 600 },
			],
			average: [
				{ x: '2021-02-01', y: 200 },
				{ x: '2021-03-01', y: 300 },
				{ x: '2021-04-01', y: 400 },
				{ x: '2021-05-01', y: 500 },
				{ x: '2021-03-01', y: 600 },
				{ x: '2021-01-01', y: 700 },
			],
			high: [
				{ x: '2021-02-01', y: 300 },
				{ x: '2021-03-01', y: 400 },
				{ x: '2021-04-01', y: 500 },
				{ x: '2021-05-01', y: 600 },
				{ x: '2021-03-01', y: 700 },
				{ x: '2021-01-01', y: 800 },
			],
		};

		const result = groupBy(data);

		expect(result).toEqual(expectedEndpoint);
	});
});
