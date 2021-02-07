import { Line } from 'react-chartjs-2';
import { FaDownload, FaRegBookmark } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';

import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Graph = ({ data, options }) => {
	return (
		<div className={styles.container}>
			<ul className={styles.actions}>
				<li>
					<BsReply />
				</li>
				<li>
					<FaDownload />
				</li>
				<li>
					<FaRegBookmark />
				</li>
			</ul>
			<Line data={data} options={options} />
		</div>
	);
};

Graph.prototypes = {
	data: PropTypes.shape({}).isRequired,
	options: PropTypes.shape({}).isRequired,
};

export default Graph;
