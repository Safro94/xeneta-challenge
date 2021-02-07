/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import Card from 'components/card';
import Graph from 'components/graph';

import { marketPositions } from 'constants/marketPositions';

import { useBenchmarks } from 'hooks/benchmarks';

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

	const [filteredGraphData, setfilteredGraphData] = useState({});

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
				},
				{
					label: marketPositions.average,
					data: data.types[marketPositions.average],
					fill: false,
					backgroundColor: 'rgb(54, 162, 235)',
					borderColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-1',
				},
				{
					label: marketPositions.high,
					data: data.types[marketPositions.high],
					fill: false,
					backgroundColor: 'rgb(0, 255, 128)',
					borderColor: 'rgba(0, 255, 128, 0.2)',
					yAxisID: 'y-axis-1',
				},
			],
		};

		setfilteredGraphData(graphData);
	}, [setfilteredGraphData, departureDate, returnDate]);

	return (
		<section>
			{departureDate && returnDate && (
				<Card>
					{data?.hasElements ? (
						<Graph data={filteredGraphData} options={options} />
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
