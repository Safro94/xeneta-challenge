import SearchContainer from 'containers/searchContainer';
import GraphContainer from 'containers/graphContainer';

import { useBenchmarks } from 'hooks/benchmarks';

import styles from './index.module.scss';

const Home = () => {
	const { data } = useBenchmarks();

	return (
		<div className={styles.container}>
			<SearchContainer />
			{data.renderGraph && <GraphContainer />}
		</div>
	);
};

export default Home;
