import { render } from 'utils/test-utils';
import Nav from '../';

describe('Nav', () => {
	it('should match the snapshot', () => {
		const { container } = render(<Nav />);
		expect(container.firstElementChild).toMatchSnapshot();
	});
});
