import React from 'react';

import styles from './index.module.scss';

const Tabs = ({ tabs, selected, setSelected, children }) => {
	return (
		<>
			<ul className={styles.tabList}>
				{tabs.map(tab => {
					return (
						<li key={tab}>
							<button
								onClick={() => setSelected(tab)}
								type='button'
								className={
									tab === selected
										? `${styles.tabLink} ${styles.tabLinkActive}`
										: styles.tabLink
								}
							>
								{tab}
							</button>
						</li>
					);
				})}
			</ul>
			{children}
		</>
	);
};

Tabs.Tab = ({ isSelected, children }) => (isSelected ? <>{children}</> : null);

export default Tabs;
