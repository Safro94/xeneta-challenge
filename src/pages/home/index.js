import SearchContainer from 'containers/searchContainer';
import GraphContainer from 'containers/graphContainer';

import { BenchmarksProvider } from 'hooks/benchmarks';

import styles from './index.module.scss';

const Home = () => {
	return (
		<div className={styles.container}>
			<BenchmarksProvider>
				<SearchContainer />
				<GraphContainer />
			</BenchmarksProvider>
		</div>
	);
};

export default Home;
