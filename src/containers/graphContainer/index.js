import { useState } from 'react';

import isWithinInterval from 'date-fns/isWithinInterval';

import Card from 'components/card';
import Graph from 'components/graph';

import { useBenchmarks } from 'hooks/benchmarks';

const types = {
	low: 'Low',
	average: 'Average',
	high: 'High',
};

const options = {
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

	const validateDatePeriod = day => {
		return isWithinInterval(new Date(day), {
			start: new Date(departureDate),
			end: new Date(returnDate),
		});
	};

	const [hasElements] = useState(() =>
		data?.some(item => validateDatePeriod(item.day))
	);

	const getData = type =>
		data.filter(item => {
			if (validateDatePeriod(item.day)) {
				return {
					x: item.day,
					y: item[type],
				};
			}

			return false;
		});

	const graphData = {
		labels: data.map(item => item.day),
		datasets: [
			{
				label: types.low,
				data: getData(types.low),
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
				yAxisID: 'y-axis-1',
			},
			{
				label: types.average,
				data: getData(types.average),
				fill: false,
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgba(54, 162, 235, 0.2)',
				yAxisID: 'y-axis-1',
			},
			{
				label: types.high,
				data: getData(types.high),
				fill: false,
				backgroundColor: 'rgb(0, 255, 128)',
				borderColor: 'rgba(0, 255, 128, 0.2)',
				yAxisID: 'y-axis-1',
			},
		],
	};

	return (
		<section>
			{departureDate && returnDate && (
				<Card>
					{hasElements ? (
						<Graph data={graphData} options={options} />
					) : (
						<span>
							There is no data between those dates, please select another date
							range
						</span>
					)}
				</Card>
			)}
		</section>
	);
};

export default GraphContainer;
