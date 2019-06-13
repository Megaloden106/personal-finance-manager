import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { AppState } from '@/reducers';
import styles from './HeaderBar.scss';

interface HeaderProp {
  username: string;
}

const HeaderBar: SFC<HeaderProp> = ({ username }) => (
  <div className={styles.header}>
    <h1 className={styles.headerLogo}>Personal Finance MS</h1>
    <h3 className={styles.headerUsername}>{ username }</h3>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  username: state.user.username,
});

export default connect(mapStateToProps)(HeaderBar as any);
