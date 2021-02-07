import { render, screen } from 'utils/test-utils';

import Card from '../';

describe('Card', () => {
	it('should match the snapshot', () => {
		const { container } = render(<Card>Test</Card>);

		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should render the children', () => {
		render(<Card>Test</Card>);

		expect(screen.getByText(/test/i)).toBeInTheDocument()
	});
});
