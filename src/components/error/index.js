import error from 'assets/error.png';

import styles from './index.module.scss';

const Error = ({ resetErrorBoundary }) => {
  return (
    <div className={styles.container} role='alert'>
      <img className={styles.image} src={error} alt='Error' />
      <h2>
        Ooops, there's been an error, please{' '}
        <span className={styles.errorRecovery} onClick={resetErrorBoundary}>
          try again
        </span>{' '}
        in a few minutes
      </h2>
    </div>
  );
};

export default Error;
