import { format } from 'date-fns';

import { render, screen, fireEvent } from 'utils/test-utils';
import Datepicker from '../';

jest.mock('date-fns', () => {
	return {
		format: jest.fn(),
	};
});

describe('Datepicker', () => {
	const onSelectItem = jest.fn();
	const placeholderStart = 'Start date';
	const placeholderEnd = 'End date';

	beforeEach(() => {
		format.mockImplementation(() => '2020-10-01');
	});

	it('should match the snapshot', () => {
		const { container } = render(
			<Datepicker
				onSelectItem={onSelectItem}
				placeholderStart={placeholderStart}
				placeholderEnd={placeholderEnd}
			/>
		);
		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should call the callback fn when the date is selected', () => {
		render(
			<Datepicker
				onSelectItem={onSelectItem}
				placeholderStart={placeholderStart}
				placeholderEnd={placeholderEnd}
			/>
		);

		const startDateInput = screen.getByPlaceholderText(/start date/i);
		const returnDateInput = screen.getByPlaceholderText(/end date/i);

		fireEvent.change(startDateInput, { target: { value: '2020-10-01' } });
		expect(onSelectItem).toHaveBeenCalledTimes(1);
		expect(onSelectItem).toHaveBeenCalledWith('2020-10-01', 'departureDate');

		fireEvent.change(returnDateInput, { target: { value: '2020-10-01' } });
		expect(onSelectItem).toHaveBeenCalledTimes(2);
		expect(onSelectItem).toHaveBeenCalledWith('2020-10-01', 'returnDate');
	});
});
