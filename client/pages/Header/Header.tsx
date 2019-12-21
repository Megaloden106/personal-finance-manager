import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppState } from '@/store/models/store';
import { HeaderProps, StateProps } from './models/Header';
import styles from './Header.scss';

const HeaderBar: FC<HeaderProps> = ({ username }) => (
  <div className={styles.header}>
    <h1 className={styles.headerLogo}>Personal Finance MS</h1>
    <h3 className={styles.headerUsername}>{ username }</h3>
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(HeaderBar);
