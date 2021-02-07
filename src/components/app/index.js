import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Sidebar from 'components/sidebar';
import Header from 'components/header';
import Error from 'components/error';

import Home from 'pages/home';
import NotFound from 'pages/notFound';

import { HOME } from 'constants/routes';

import styles from './index.module.scss';

const App = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className={styles.app}>
			<Sidebar isOpen={showSidebar} />

			<div>
				<Header isOpen={showSidebar} handleSidebar={setShowSidebar} />
				<main className={styles.main}>
					<ErrorBoundary FallbackComponent={Error}>
						<Switch>
							<Route exact path={HOME} component={Home} />
							<Route component={NotFound} />
						</Switch>
					</ErrorBoundary>
				</main>
			</div>
		</div>
	);
};

export default App;
