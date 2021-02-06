import { Route, Switch } from 'react-router-dom';

import Home from 'pages/home';
import NotFound from 'pages/notFound';

import { HOME } from 'constants/routes';

const App = () => (
	<>
		<Switch>
			<Route exact path={HOME} component={Home} />
			<Route component={NotFound} />
		</Switch>
	</>
);

export default App;
