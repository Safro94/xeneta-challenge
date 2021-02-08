import { render } from 'utils/test-utils';
import Graph from '../';

describe('Graph', () => {
  it('should match the snapshot', () => {
    const data = {};
    const options = {};

    const { container } = render(<Graph data={data} options={options} />);
    expect(container.firstElementChild).toMatchSnapshot();
  });
});
