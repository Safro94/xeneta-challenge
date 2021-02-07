import { render } from 'utils/test-utils';

import Error from '../';

describe('Error', () => {
	it('should match the snapshot', () => {
		const { container } = render(<Error />);

		expect(container.firstElementChild).toMatchSnapshot();
	});
});
