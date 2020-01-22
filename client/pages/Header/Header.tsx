import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/models/store';
import styles from './Header.scss';

const HeaderBar: FC = () => {
  const username = useSelector((state: AppState) => state.user.username);

  return (
    <div className={styles.header}>
      <h1 className={styles.headerLogo}>Personal Finance MS</h1>
      <h3 className={styles.headerUsername}>{ username }</h3>
    </div>
  );
};

export default HeaderBar;
