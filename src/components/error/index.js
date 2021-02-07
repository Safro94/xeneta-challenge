import error from 'assets/error.png';

import styles from './index.module.scss';

const Error = () => {
	return (
		<div className={styles.container} role='alert'>
			<img className={styles.image} src={error} alt='Error' />
			<h2>Ooops, there's been an error, please try again in a few minutes</h2>
		</div>
	);
};

export default Error;
