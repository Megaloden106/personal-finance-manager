import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './BaseNavBar.scss';

interface StateProps {
  accessLevel: number;
}

type BaseNavBarProps = StateProps & RouteComponentProps;

interface Route {
  name: string;
  endpoint: string;
  level: number;
  className?: string;
}

const BaseNavBar: FunctionComponent<BaseNavBarProps> = ({ accessLevel, location }) => {
  let routes: Route[] = [
    { name: 'Summary', endpoint: '/', level: 0 },
    { name: 'Portfolio', endpoint: '/portfolio/', level: 0 },
    { name: 'Table', endpoint: '/table/', level: 0 },
    { name: 'Allocation', endpoint: '/allocation/', level: 1 },
  ];

  routes = routes.map(route => ({
    ...route,
    className: location.pathname === route.endpoint ? styles.selected : undefined,
  }));

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {routes.map((route: Route) => (accessLevel < route.level
            ? <li className={styles.disabled}>{ route.name }</li>
            : <Link to={route.endpoint}><li className={route.className}>{ route.name }</li></Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  accessLevel: state.user.accessLevel,
});

export default withRouter(connect(mapStateToProps)(BaseNavBar));
