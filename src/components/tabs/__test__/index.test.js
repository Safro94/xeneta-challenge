import { render, screen } from 'utils/test-utils';
import Tabs from '../';

describe('Tabs', () => {
	const tabs = ['Tab', 'Tab2'];
	const selected = 'Tab';
	const setSelected = jest.fn();

	it('should match the snapshot', () => {
		const { container } = render(
			<Tabs tabs={tabs} selected={selected} setSelected={setSelected}>
				<Tabs.Tab isSelected={selected === 'Tab'}>
					<h1>Tab</h1>
				</Tabs.Tab>
				<Tabs.Tab isSelected={selected === 'Tab2'}>
					<h1>Tab2</h1>
				</Tabs.Tab>
			</Tabs>
		);
		expect(container.firstElementChild).toMatchSnapshot();
	});

	it('should have two buttons', () => {
		render(
			<Tabs tabs={tabs} selected={selected} setSelected={setSelected}>
				<Tabs.Tab isSelected={selected === 'Tab'}>
					<h1>Tab content</h1>
				</Tabs.Tab>
				<Tabs.Tab isSelected={selected === 'Tab2'}>
					<h1>Tab2 content</h1>
				</Tabs.Tab>
			</Tabs>
		);

		expect(screen.getByText('Tab')).toBeInTheDocument();
		expect(screen.getByText('Tab2')).toBeInTheDocument();
		expect(screen.getAllByRole('button')).toHaveLength(2);
	});

	it('should render the content', () => {
		render(
			<Tabs tabs={tabs} selected={selected} setSelected={setSelected}>
				<Tabs.Tab isSelected={selected === 'Tab'}>
					<h1>Tab content</h1>
				</Tabs.Tab>
			</Tabs>
		);

		expect(screen.getByText(/tab content/i)).toBeInTheDocument();
	});
});
