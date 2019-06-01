import React, { SFC } from 'react';
import styles from './HeaderBar.scss';

const HeaderBar: SFC = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      HEADER BAR
    </div>
  </div>
);

export default HeaderBar;
