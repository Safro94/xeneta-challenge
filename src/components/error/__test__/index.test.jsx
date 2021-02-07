import { render } from 'utils/test-utils';

import Error from '../';

describe('Error', () => {
	it('should match the snapshot', () => {
		//Act
		const { container } = render(<Error />);

		//Assert
		expect(container.firstElementChild).toMatchSnapshot();
	});
});
