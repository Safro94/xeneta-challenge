import { render } from 'utils/test-utils';
import Datepicker from '../';

describe('Datepicker', () => {
	const onSelectItem = jest.fn();
	const placeholderStart = 'Start date';
	const placeholderEnd = 'End date';

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
});
