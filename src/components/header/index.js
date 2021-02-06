import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HOME } from 'constants/routes';

import styles from './index.module.scss';

const Header = ({ handleSidebar, isOpen }) => {
	return (
		<div className={styles.header}>
			<div className={styles.iconContainer}>
				<Link
					to={HOME}
					className={styles.barsIcon}
					style={{ transform: `translateX(${isOpen ? '50vw' : '0'})` }}
				>
					<FaBars onClick={() => handleSidebar(!isOpen)} />
				</Link>
			</div>
			<div className={styles.user}>
				<div className={styles.userIcon}>
					<FaUserCircle />
				</div>
				<span className={styles.text}>Welcome user</span>
			</div>
		</div>
	);
};

Header.propTypes = {
	isOpen: PropTypes.bool,
	handleSidebar: PropTypes.func,
};

export default Header;
