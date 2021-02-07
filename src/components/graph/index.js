import { Line } from 'react-chartjs-2';

import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Graph = ({ data, options }) => {
	return (
		<div className={styles.container}>
			<Line data={data} options={options} />
		</div>
	);
};

Graph.prototypes = {
	data: PropTypes.shape({}).isRequired,
	options: PropTypes.shape({}).isRequired,
};

export default Graph;
