import { Line } from 'react-chartjs-2';

import styles from './index.module.scss';

const Graph = ({ data, options }) => {
	return (
		<div className={styles.container}>
			<Line data={data} options={options} />
		</div>
	);
};

export default Graph;
