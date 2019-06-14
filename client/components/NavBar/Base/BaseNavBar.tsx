import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState } from '@/reducers';
import styles from './BaseNavBar.scss';

interface BaseNavBarProp extends RouteComponentProps {
  accessLevel: number;
}

interface Route {
  name: string;
  endpoint: string;
  level: number;
  className?: string;
}

const BaseNavBar: SFC<BaseNavBarProp> = ({ accessLevel, location }) => {
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
          {routes.map(({
            name,
            endpoint,
            className,
            level,
          }: Route) => (accessLevel < level
            ? <li className={styles.disabled}>{ name }</li>
            : <Link to={endpoint}><li className={className}>{ name }</li></Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  accessLevel: state.user.accessLevel,
});

export default withRouter(connect(mapStateToProps)(BaseNavBar as any) as any);
