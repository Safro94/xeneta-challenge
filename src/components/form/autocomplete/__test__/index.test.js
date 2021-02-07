import { render, screen } from 'utils/test-utils';

import userEvent from '@testing-library/user-event';

import Autocomplete from '../';

describe('Autocomplete', () => {
	const characters = 3;
	const source = [{ text: 'hello' }, { text: 'hello world' }];
	const error = {
		status: false,
		message: 'error',
	};
	const onSelectItem = jest.fn();
	const id = 'test';

	describe('Autocomplete snapshot', () => {
		it('should render OK', () => {
			const { container } = render(
				<Autocomplete error={error} source={source} characters={characters} />
			);
			expect(container).toMatchSnapshot();
		});
	});

	describe('Autocomplete functionality', () => {
		it('should show suggestions after the user enters 3 characters', () => {
			render(
				<Autocomplete
					onSelectItem={onSelectItem}
					error={error}
					characters={characters}
					source={source}
					id={id}
				/>
			);

			const input = screen.getByRole('textbox');
			userEvent.type(input, 'Hello');

			expect(screen.getAllByRole('listbox')).toHaveLength(2);
			expect(screen.getAllByText(/hello/i)).toHaveLength(2);
			expect(screen.getByText(/world/i)).toBeInTheDocument();

			userEvent.type(input, 'Hello world');
			expect(screen.getAllByText(/hello/i)).toHaveLength(1);

			userEvent.click(screen.getAllByTestId('menu-item')[0]);
			expect(onSelectItem).toHaveBeenCalledTimes(1);
			expect(onSelectItem).toHaveBeenCalledWith({ text: 'hello world' }, id);
		});

		it('should show the error', () => {
			const error = {
				status: true,
				message: 'error',
			};

			render(
				<Autocomplete
					onSelectItem={onSelectItem}
					error={error}
					characters={characters}
					source={source}
					id={id}
				/>
			);

			expect(screen.getByText(error.message)).toBeInTheDocument();
		});
	});
});
