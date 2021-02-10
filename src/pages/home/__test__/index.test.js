import { render, screen, waitFor } from 'utils/test-utils';
import Home from '../';

import { useFetch } from 'hooks/fetcher';
import { useBenchmarks } from 'hooks/benchmarks';

jest.mock('hooks/benchmarks', () => {
	return {
		useBenchmarks: jest.fn(),
	};
});

jest.mock('hooks/fetcher', () => ({
	useFetch: jest.fn(),
}));

describe('Home', () => {
	beforeEach(() => {
		useFetch.mockImplementation(() => ({
			response: [
				{ code: 'SH', text: 'Shangai' },
				{ code: 'Sa', text: 'San Pablo' },
				{ code: 'AM', text: 'Amsterdam' },
			],
		}));
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
