import { FaUserCircle, FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Header = ({ handleSidebar, isOpen }) => {
	return (
		<header className={styles.header}>
			<div className={styles.iconContainer}>
				<div
					className={styles.barsIcon}
					style={{ transform: `translateX(${isOpen ? '50vw' : '0'})` }}
				>
					<FaBars
						data-testid='bars-icon'
						onClick={() => handleSidebar(!isOpen)}
					/>
				</div>
			</div>
			<div className={styles.user}>
				<div className={styles.userIcon}>
					<FaUserCircle />
				</div>
				<span className={styles.text}>Welcome user</span>
			</div>
		</header>
	);
};

Header.propTypes = {
	isOpen: PropTypes.bool,
	handleSidebar: PropTypes.func,
};

export default Header;
