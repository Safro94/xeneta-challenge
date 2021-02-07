import { useRef } from 'react';

import Card from 'components/card';
import Graph from 'components/graph';

import { useBenchmarks } from 'hooks/benchmarks';

import styles from './index.module.scss';

const GraphContainer = () => {
	const chartRef = useRef(null);
	const { data } = useBenchmarks();

	return (
		<section className={styles.container}>
			<Card>
				<Graph ref={chartRef} data={data} />
			</Card>
			<Card></Card>
		</section>
	);
};

export default GraphContainer;
