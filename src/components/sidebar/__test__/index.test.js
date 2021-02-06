import { render } from 'utils/test-utils';
import Sidebar from '../';

describe('Sidebar', () => {
	it('should match the snapshot when isOpen is false', () => {
		const isOpen = false;
		const { container } = render(<Sidebar isOpen={isOpen} />);
		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should match the snapshot when isOpen is true', () => {
		const isOpen = true;
		const { container } = render(<Sidebar isOpen={isOpen} />);
		expect(container.firstElementChild).toMatchSnapshot();
	});
});
