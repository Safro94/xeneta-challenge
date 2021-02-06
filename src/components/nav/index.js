import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import NavData from 'components/nav/navData';

import styles from './index.module.scss';

const Nav = ({ onClose }) => {
	return (
		<nav>
			<ul className={styles.items} onClick={() => onClose(false)}>
				{/* <li className={styles.toggle}>
					<Link to='#' className={styles.closeIcon}>
						<AiOutlineClose />
					</Link>
				</li> */}
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
