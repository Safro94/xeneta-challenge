import Autocomplete from 'components/form/autocomplete';

import styles from './index.module.scss';

const Form = ({ children, ...rest }) => {
	return <form {...rest}>{children}</form>;
};

Form.Error = ({ children, ...rest }) => {
	return <div></div>;
};

Form.Autocomplete = ({ ...rest }) => {
	return (
		<div className={styles.formGroup}>
			<Autocomplete {...rest} />
		</div>
	);
};

// Form.Datepicker = ({ ...rest }) => {
// 	return <Datepicker {...rest} />;
// };

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
