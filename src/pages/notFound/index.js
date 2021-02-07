import { Link } from 'react-router-dom';

import Icon from 'components/icon';

import { HOME } from 'constants/routes';

import styles from './index.module.scss';

const NotFound = () => {
	return (
		<div className={styles.container}>
			<Icon classes={styles.icon} name='notFound' />
			<h2>
				Go back to the{' '}
				<Link className={styles.link} to={HOME}>
					home page
				</Link>
			</h2>
		</div>
	);
};

export default NotFound;
