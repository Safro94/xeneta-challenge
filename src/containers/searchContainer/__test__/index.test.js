import { render, screen, waitFor } from 'utils/test-utils';
import SearchContainer from '../';

import fetcher from 'utils/fetcher';
import { useBenchmarks } from 'hooks/benchmarks';
import { useFetch } from 'hooks/fetcher';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { format } from 'date-fns';

const mockSetGraphData = jest.fn();
const mockSetPeriod = jest.fn();

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

describe('Search Container', () => {
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

		useBenchmarks.mockImplementation(() => ({
			setGraphData: mockSetGraphData,
			setPeriod: mockSetPeriod,
		}));

		format
			.mockImplementationOnce(() => '2020-10-01')
			.mockImplementationOnce(() => '2020-11-01')
			.mockImplementationOnce(() => '2020-10-01')
			.mockImplementationOnce(() => '2020-11-01');

		fetcher.mockImplementation(() => Promise.resolve(fetcherResponse));
	});

	it('should fill the form and activate the button', async () => {
		render(<SearchContainer />);

		const departureInput = screen.getByPlaceholderText(/departure/i);
		const destinationInput = screen.getByPlaceholderText(/destination/i);
		const startDateInput = screen.getByPlaceholderText(/start date/i);
		const returnDateInput = screen.getByPlaceholderText(/end date/i);
		const button = screen.getByText(/search/i);

		expect(button).toBeDisabled();
		userEvent.type(departureInput, 'sa');
		fireEvent.blur(departureInput);

		userEvent.type(destinationInput, 'am');
		fireEvent.blur(destinationInput);

		fireEvent.change(startDateInput, { target: { value: '2020-10-01' } });
		fireEvent.change(returnDateInput, { target: { value: '2020-11-01' } });

		await waitFor(() => {
			expect(button).not.toBeDisabled();
		});
	});

	it('should set the data and period when the submit button is clicked', async () => {
		render(<SearchContainer />);

		const departureInput = screen.getByPlaceholderText(/departure/i);
		const destinationInput = screen.getByPlaceholderText(/destination/i);
		const startDateInput = screen.getByPlaceholderText(/start date/i);
		const returnDateInput = screen.getByPlaceholderText(/end date/i);
		const button = screen.getByText(/search/i);

		expect(button).toBeDisabled();
		userEvent.type(departureInput, 'sa');
		fireEvent.blur(departureInput);

		userEvent.type(destinationInput, 'am');
		fireEvent.blur(destinationInput);

		fireEvent.change(startDateInput, { target: { value: '2020-10-01' } });
		fireEvent.change(returnDateInput, { target: { value: '2020-11-01' } });

		userEvent.click(button);

		await waitFor(() => {
			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(fetcher).toHaveBeenCalledWith({ url: '/api/rates/Sa/AM' });

			expect(mockSetGraphData).toHaveBeenCalledTimes(1);
			expect(mockSetGraphData).toHaveBeenCalledWith(fetcherResponse, {
				departureDate: '2020-10-01',
				returnDate: '2020-11-01',
			});

			expect(mockSetPeriod).toHaveBeenCalledTimes(1);
			expect(mockSetPeriod).toHaveBeenCalledWith({
				departureDate: '2020-10-01',
				returnDate: '2020-11-01',
			});
		});
	});
});
