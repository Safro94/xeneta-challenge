import Card from 'components/card';

import styles from './index.module.scss';

const GraphContainer = () => {
	return (
		<section className={styles.container}>
			<Card></Card>
			<Card></Card>
		</section>
	);
};

export default GraphContainer;
