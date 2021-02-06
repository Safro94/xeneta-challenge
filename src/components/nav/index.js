import { NavLink } from 'react-router-dom';

import NavData from 'components/nav/navData';

import styles from './index.module.scss';

const Nav = () => {
	return (
		<nav>
			<ul className={styles.items}>
				{NavData.map(item => (
					<li>
						<NavLink
							to={item.path}
							className={styles.link}
							activeClassName={styles.activeLink}
							exact
						>
							<div>{item.icon}</div>
							<span>{item.title}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
