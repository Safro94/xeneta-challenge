/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import 'chartjs-plugin-datalabels';

import Card from 'components/card';
import Graph from 'components/graph';
import Tabs from 'components/tabs';

import { useBenchmarks } from 'hooks/benchmarks';

import { marketPositions } from 'constants/marketPositions';
import { BENCHMARKS_TAB, TRENDS_TAB } from 'constants/tabs';

const options = {
  plugins: {
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 4,
      color: 'white',
      font: {
        weight: 'bold',
      },
      clamp: true,
      display: 'auto',
      formatter: (value) => {
        return value.y;
      },
      padding: 6,
    },
  },

  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Price',
        },
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
        type: 'time',
        time: {
          displayFormats: {
            week: 'll',
          },
          unit: 'week',
        },
      },
    ],
  },
};

const GraphContainer = () => {
  const {
    data,
    period: { departureDate, returnDate },
  } = useBenchmarks();

  const [filteredGraphData, setfilteredGraphData] = useState({});
  const [selectedTab, setSelectedTab] = useState(BENCHMARKS_TAB);

  useEffect(() => {
    const graphData = {
      labels: data.labels,
      datasets: [
        {
          label: marketPositions.low,
          data: data.types[marketPositions.low],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y-axis-1',
          datalabels: {
            align: 'start',
            anchor: 'start',
          },
        },
        {
          label: marketPositions.average,
          data: data.types[marketPositions.average],
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: 'y-axis-1',
          datalabels: {
            align: 'start',
            anchor: 'start',
          },
        },
        {
          label: marketPositions.high,
          data: data.types[marketPositions.high],
          fill: false,
          backgroundColor: 'rgb(0, 255, 128)',
          borderColor: 'rgba(0, 255, 128, 0.2)',
          yAxisID: 'y-axis-1',
          datalabels: {
            align: 'end',
            anchor: 'end',
          },
        },
      ],
    };

    setfilteredGraphData(graphData);
  }, [setfilteredGraphData, departureDate, returnDate]);

  return (
    <section>
      {departureDate && returnDate && (
        <Card>
          <Tabs
            tabs={[BENCHMARKS_TAB, TRENDS_TAB]}
            selected={selectedTab}
            setSelected={setSelectedTab}
          >
            <Tabs.Tab isSelected={selectedTab === BENCHMARKS_TAB}>
              {data?.hasElements ? (
                <Graph data={filteredGraphData} options={options} />
              ) : (
                <span>
                  There is no data between those dates, please select another
                  date range
                </span>
              )}
            </Tabs.Tab>

            <Tabs.Tab isSelected={selectedTab === TRENDS_TAB}>
              <h1>Trends</h1>
            </Tabs.Tab>
          </Tabs>
        </Card>
      )}
    </section>
  );
};

export default GraphContainer;
