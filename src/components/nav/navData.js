import { FaCog, FaHome, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

import { HOME } from 'constants/routes';

const NavbarData = [
	{
		title: 'Home',
		path: HOME,
		icon: <FaHome />,
	},
	{
		title: 'Settings',
		path: '/settings',
		icon: <FaCog />,
	},
	{
		title: 'Account',
		path: '/account',
		icon: <FaUserCircle />,
	},
	{
		title: 'Log out',
		path: '/log-out',
		icon: <FaSignOutAlt />,
	},
];

export default NavbarData;
