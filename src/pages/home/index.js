import SearchContainer from 'containers/searchContainer';
import GraphContainer from 'containers/graphContainer';

import styles from './index.module.scss';

const Home = () => {
	return (
		<div className={styles.container}>
			<SearchContainer />
			<GraphContainer />
		</div>
	);
};

export default Home;
