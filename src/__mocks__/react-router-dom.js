import React from 'react';

module.exports = {
	Link: ({ children, ...rest }) => <a {...rest}>{children}</a>,
	NavLink: ({ children, ...rest }) => <a {...rest}>{children}</a>,
};
