import { render, screen } from 'utils/test-utils';
import Form from '../';

jest.mock('react-nice-dates', () => ({
	DateRangePicker: () => <div>DateRangePicker</div>,
}));

describe('Form', () => {
	it('should match the snapshot', () => {
		const { container } = render(
			<Form>
				<Form.Autocomplete
					placeholder='Departure'
					value='2020-05-01'
					source={[]}
					onSelectItem={() => {}}
					onBlurSelected
					id='departure'
				/>

				<Form.Datepicker onSelectItem={() => {}} />
				<Form.Submit disabled>Search</Form.Submit>
			</Form>
		);

		expect(screen.getByPlaceholderText(/Departure/i)).toBeInTheDocument();
		expect(screen.getByText(/DateRangePicker/i)).toBeInTheDocument();
		expect(screen.getByText(/search/i)).toBeDisabled();
		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should have a button not disabled', () => {
		render(
			<Form>
				<Form.Datepicker onSelectItem={() => {}} />
				<Form.Submit>Search</Form.Submit>
			</Form>
		);

		expect(screen.getByText(/search/i)).not.toBeDisabled();
	});
});
