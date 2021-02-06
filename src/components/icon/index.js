import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const Icon = ({ name, classes }) => {
	const [IconElement, setIconRender] = useState({ Icon: '' });

	useEffect(() => {
		let isSubscribed = true;
		const getIcon = () => {
			const { default: Icon } = require(`./${name}`);
			if (isSubscribed) setIconRender({ Icon });
		};

		getIcon();

		return () => (isSubscribed = false);
	}, [name]);

	return (
		<i className={classes}>
			{IconElement.Icon && <IconElement.Icon className={classes} />}
		</i>
	);
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Icon;
