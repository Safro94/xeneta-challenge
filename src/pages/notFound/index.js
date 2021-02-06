import Icon from 'components/icon';

import styles from './index.module.scss';

const NotFound = () => {
	return (
		<div>
			<Icon classes={styles.icon} name='notFound' />
			<h2>Go back to the Home page</h2>
		</div>
	);
};

export default NotFound;
