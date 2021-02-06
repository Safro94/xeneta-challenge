import { useState } from 'react';

import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Navbar from 'components/nav';
import Icon from 'components/icon';

import { HOME } from 'constants/routes';

import styles from './index.module.scss';

const Sidebar = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className={styles.container}>
			<aside
				className={
					showSidebar ? `${styles.sidebar} ${styles.active}` : styles.sidebar
				}
			>
				{/* <div>
					<Link to={HOME} className={styles.barsIcon}>
						<FaBars onClick={handleClick} />
					</Link>
				</div> */}
				<div className={styles.logo}>
					<Icon name='logo' />
				</div>
				<Navbar onClose={setShowSidebar} />
			</aside>
		</div>
	);
};

export default Sidebar;
