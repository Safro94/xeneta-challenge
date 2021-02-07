import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { BenchmarksProvider, useBenchmarks } from '../';

const TestComponent = ({ children }) => {
	return <BenchmarksProvider>{children}</BenchmarksProvider>;
};

describe('Benchmarks Hook', () => {
	it('should set the data when setGraphData is called', async () => {
		const data = ['test', 'test1'];

		const { result } = renderHook(() => useBenchmarks(), {
			wrapper: ({ children }) => <TestComponent>{children}</TestComponent>,
		});

		const { setGraphData } = result.current;

		expect(result.current.data).toEqual([]);

		act(() => {
			setGraphData(data);
		});

		await waitFor(() => {
			expect(result.current.data).toEqual(data);
		});
	});

	it('should set the period when setPeriod is called', async () => {
		const period = { departureDate: '2021-03-04', returnDate: '2021-04-04' };

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
