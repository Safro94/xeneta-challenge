import { render, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
import Header from '../';

describe('Header', () => {
	const handleSidebar = jest.fn();

	it('should match the snapshot when isOpen is false', () => {
		const isOpen = false;
		const { container } = render(
			<Header isOpen={isOpen} handleSidebar={handleSidebar} />
		);
		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should match the snapshot when isOpen is true', () => {
		const isOpen = true;
		const { container } = render(
			<Header isOpen={isOpen} handleSidebar={handleSidebar} />
		);
		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should call handleSidebar when the bars icon is clicked', () => {
		const isOpen = false;

		render(<Header isOpen={isOpen} handleSidebar={handleSidebar} />);

		const icon = screen.getByTestId('bars-icon');
		expect(handleSidebar).not.toHaveBeenCalled();
		userEvent.click(icon);
		expect(handleSidebar).toHaveBeenCalledTimes(1);
		expect(handleSidebar).toHaveBeenCalledWith(!isOpen);
	});
});
