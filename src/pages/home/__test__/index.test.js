import { format } from 'date-fns';

import { render, screen, waitFor } from 'utils/test-utils';
import Home from '../';

import { useFetch } from 'hooks/fetcher';
import { useBenchmarks } from 'hooks/benchmarks';

import fetcher from 'utils/fetcher';

jest.mock('hooks/benchmarks', () => {
	return {
		useBenchmarks: jest.fn(),
	};
});

jest.mock('hooks/fetcher', () => ({
	useFetch: jest.fn(),
}));

jest.mock('date-fns', () => {
	return {
		format: jest.fn(),
	};
});

jest.mock('utils/fetcher');

describe('Home', () => {
	const fetcherResponse = [
		{ day: '2020-05-01', low: 100, mean: 200, high: 300 },
	];

	beforeEach(() => {
		useFetch.mockImplementation(() => ({
			response: [
				{ code: 'SH', text: 'Shangai' },
				{ code: 'Sa', text: 'San Pablo' },
				{ code: 'AM', text: 'Amsterdam' },
			],
		}));

		format
			.mockImplementationOnce(() => '2020-10-01')
			.mockImplementationOnce(() => '2020-11-01');

		fetcher.mockImplementation(() => Promise.resolve(fetcherResponse));
	});

	it('should show the graph when renderGraph is true', async () => {
		useBenchmarks.mockImplementation(() => ({
			data: {
				labels: ['test', 'test2'],
				types: {
					low: {},
					average: {},
				},
				hasElements: true,
				renderGraph: true,
			},
			period: {
				departureDate: '2020-10-11',
				returnDate: '2020-11-10',
			},
		}));

		render(<Home />);

		await waitFor(() => {
			expect(screen.getByPlaceholderText(/departure/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/destination/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/start date/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/end date/i)).toBeInTheDocument();
			expect(screen.getByText(/search/i)).toBeInTheDocument();
			expect(screen.getByText(/benchmarks/i)).toBeInTheDocument();
			expect(screen.getByText(/graph/i)).toBeInTheDocument();
		});
	});

	it('should not show the graph when renderGraph is false', async () => {
		useBenchmarks.mockImplementation(() => ({
			data: {
				renderGraph: false,
			},
		}));

		render(<Home />);

		await waitFor(() => {
			expect(screen.getByPlaceholderText(/departure/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/destination/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/start date/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/end date/i)).toBeInTheDocument();
			expect(screen.getByText(/search/i)).toBeInTheDocument();
			expect(screen.queryByText(/benchmarks/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/graph/i)).not.toBeInTheDocument();
		});
	});
});
