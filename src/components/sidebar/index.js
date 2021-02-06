import PropTypes from 'prop-types';

import Navbar from 'components/nav';
import Icon from 'components/icon';

import styles from './index.module.scss';

const Sidebar = ({ isOpen }) => {
	return (
		<div className={styles.container}>
			<aside
				className={
					isOpen ? `${styles.sidebar} ${styles.active}` : styles.sidebar
				}
			>
				<div className={styles.logo}>
					<Icon name='logo' />
				</div>
				<Navbar />
			</aside>
		</div>
	);
};

Sidebar.propTypes = {
	isOpen: PropTypes.bool,
};

export default Sidebar;
