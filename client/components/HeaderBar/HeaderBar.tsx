import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BaseNavBar from '@/components/NavBar/Base/BaseNavBar';
import styles from './HeaderBar.scss';

interface StateProps {
  accessLevel: number;
  id: string | number | null;
  username: string | null;
}

type HeaderProps = StateProps & RouteComponentProps;

const HeaderBar: FunctionComponent<HeaderProps> = ({
  accessLevel,
  id,
  username,
  history,
  location,
}) => {
  useEffect(() => {
    if (id) history.push(`/portfolio/${id}/`);
  }, [id]);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.headerLogo}>Personal Finance MS</h1>
        <h3 className={styles.headerUsername}>{ username }</h3>
      </div>
      <BaseNavBar
        accessLevel={accessLevel}
        id={id}
        location={location}
      />
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  accessLevel: state.user.accessLevel,
  id: state.portfolio.id,
  username: state.user.username,
});

export default withRouter(connect(mapStateToProps)(HeaderBar));
