import { Route, Switch } from 'react-router-dom';

import Sidebar from 'components/sidebar';

import Home from 'pages/home';
import NotFound from 'pages/notFound';

import { HOME } from 'constants/routes';

import styles from './index.module.scss';

const App = () => (
	<div className={styles.app}>
		<Sidebar />
		<main>
			<Switch>
				<Route exact path={HOME} component={Home} />
				<Route component={NotFound} />
			</Switch>
		</main>
	</div>
);

export default App;
