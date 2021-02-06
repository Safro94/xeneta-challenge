import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from 'components/sidebar';
import Header from 'components/header';

import Home from 'pages/home';
import NotFound from 'pages/notFound';

import { HOME } from 'constants/routes';

import styles from './index.module.scss';

const App = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className={styles.app}>
			<Sidebar isOpen={showSidebar} />

			<main>
				<Header isOpen={showSidebar} handleSidebar={setShowSidebar} />
				<Switch>
					<Route exact path={HOME} component={Home} />
					<Route component={NotFound} />
				</Switch>
			</main>
		</div>
	);
};

export default App;
