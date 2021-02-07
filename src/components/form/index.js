import Autocomplete from 'components/form/autocomplete';
import Datepicker from 'components/form/datepicker';

import styles from './index.module.scss';

const Form = ({ children, ...rest }) => {
	return <form {...rest}>{children}</form>;
};

Form.Autocomplete = ({ ...rest }) => {
	return (
		<div className={styles.formGroup}>
			<Autocomplete {...rest} />
		</div>
	);
};

Form.Datepicker = ({ ...rest }) => {
	return (
		<div className={styles.formGroup}>
			<Datepicker {...rest} />
		</div>
	);
};

Form.Submit = ({ children, ...rest }) => {
	return (
		<div className={styles.formGroup}>
			<button className={styles.button} {...rest}>
				{children}
			</button>
		</div>
	);
};

export default Form;
