import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { BenchmarksProvider, useBenchmarks } from '../';

const TestComponent = ({ children }) => {
	return <BenchmarksProvider>{children}</BenchmarksProvider>;
};

describe('Benchmarks Hook', () => {
	const data = [
		{ day: '2021-02-01', low: 100, mean: 200, high: 300 },
		{ day: '2021-03-01', low: 200, mean: 300, high: 400 },
		{ day: '2021-04-01', low: 300, mean: 400, high: 500 },
		{ day: '2021-03-07', low: 400, mean: 500, high: 600 },
	];
	const period = { departureDate: '2021-03-04', returnDate: '2021-04-04' };

	it('should set the data when setGraphData is called', async () => {
		const expectedResult = {
			labels: ['2021-04-01', '2021-03-07'],
			types: {
				low: [
					{ x: '2021-04-01', y: 300 },
					{ x: '2021-03-07', y: 400 },
				],
				average: [
					{ x: '2021-04-01', y: 400 },
					{ x: '2021-03-07', y: 500 },
				],
				high: [
					{ x: '2021-04-01', y: 500 },
					{ x: '2021-03-07', y: 600 },
				],
			},
			hasElements: true,
			renderGraph: true,
		};

		const { result } = renderHook(() => useBenchmarks(), {
			wrapper: ({ children }) => <TestComponent>{children}</TestComponent>,
		});

		const { setGraphData } = result.current;

		expect(result.current.data).toEqual({
			labels: [],
			types: {},
			hasElements: false,
			renderGraph: false,
		});

		act(() => {
			setGraphData(data, period);
		});

		await waitFor(() => {
			expect(result.current.data).toEqual(expectedResult);
		});
	});

	it('should set the data wihout types when the date is not in range', async () => {
		const dates = { departureDate: '2021-01-04', returnDate: '2021-01-04' };

		const expectedResult = {
			labels: [],
			types: {},
			hasElements: false,
			renderGraph: true,
		};

		const { result } = renderHook(() => useBenchmarks(), {
			wrapper: ({ children }) => <TestComponent>{children}</TestComponent>,
		});

		const { setGraphData } = result.current;

		expect(result.current.data).toEqual({
			labels: [],
			types: {},
			hasElements: false,
			renderGraph: false,
		});

		act(() => {
			setGraphData(data, dates);
		});

		await waitFor(() => {
			expect(result.current.data).toEqual(expectedResult);
		});
	});

	it('should set the period when setPeriod is called', async () => {
		const { result } = renderHook(() => useBenchmarks(), {
			wrapper: ({ children }) => <TestComponent>{children}</TestComponent>,
		});

		const { setPeriod } = result.current;

		expect(result.current.period).toEqual({
			departureDate: null,
			returnDate: null,
		});

		act(() => {
			setPeriod(period);
		});

		await waitFor(() => {
			expect(result.current.period).toEqual(period);
		});
	});
});
