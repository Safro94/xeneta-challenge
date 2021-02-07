import { render } from 'utils/test-utils';
import NotFound from '../';

describe('Not Found', () => {
	it('should match the snapshot', () => {
		const { container } = render(<NotFound />);
		expect(container.firstElementChild).toMatchSnapshot();
	});
});
