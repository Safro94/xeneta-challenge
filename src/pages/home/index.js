import SearchContainer from 'containers/searchContainer';

import styles from './index.module.scss';

const Home = () => {
	return (
		<div className={styles.container}>
			<SearchContainer />
		</div>
	);
};

export default Home;
