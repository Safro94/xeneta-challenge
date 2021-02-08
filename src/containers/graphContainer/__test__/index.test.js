import { render, screen } from 'utils/test-utils';
import { waitFor } from '@testing-library/react';

import GraphContainer from '../';
import { useBenchmarks } from 'hooks/benchmarks';
import userEvent from '@testing-library/user-event';

jest.mock('hooks/benchmarks', () => ({
  useBenchmarks: jest.fn(),
}));

describe('Graph Container', () => {
  it('should render the message when hasElements is false', async () => {
    useBenchmarks.mockImplementation(() => ({
      data: {
        types: {
          low: [],
          average: [],
          high: [],
        },
        hasElements: false,
      },
      period: { departureDate: '2020-05-02', returnDate: '2020-05-10' },
    }));

    render(<GraphContainer />);

    await waitFor(() => {
      expect(
        screen.getByText(/There is no data between those dates/i),
      ).toBeInTheDocument();
    });
  });

  it('should render the graph when hasElements is true', async () => {
    useBenchmarks.mockImplementation(() => ({
      data: {
        types: {
          low: [],
          average: [],
          high: [],
        },
        hasElements: true,
      },
      period: { departureDate: '2020-05-02', returnDate: '2020-05-10' },
    }));

    render(<GraphContainer />);

    await waitFor(() => {
      expect(
        screen.queryByText(/There is no data between those dates/i),
      ).not.toBeInTheDocument();
      expect(screen.getByText(/graph/i)).toBeInTheDocument();
    });
  });

  it('should switch tabs when the button tab is clicked', async () => {
    useBenchmarks.mockImplementation(() => ({
      data: {
        types: {
          low: [],
          average: [],
          high: [],
        },
        hasElements: true,
      },
      period: { departureDate: '2020-05-02', returnDate: '2020-05-10' },
    }));

    render(<GraphContainer />);

    await waitFor(() => {
      const benchmarksButton = screen.getByText(/benchmarks/i);
      expect(benchmarksButton).toBeInTheDocument();
      expect(screen.getByText(/graph/i)).toBeInTheDocument();

      userEvent.click(benchmarksButton);

      expect(screen.getByText(/trends/i)).toBeInTheDocument();
    });
  });
});
