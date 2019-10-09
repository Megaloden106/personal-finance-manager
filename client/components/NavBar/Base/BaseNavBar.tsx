import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import * as H from 'history';
import styles from './BaseNavBar.scss';

interface BaseNavBarProps {
  accessLevel: number;
  id: number | string | null;
  location: H.Location<H.LocationState>;
}

const BaseNavBar: FunctionComponent<BaseNavBarProps> = ({ accessLevel, id, location }) => {
  let routes: Route[] = [
    { name: 'Summary', endpoint: '/', level: 1 },
    { name: 'Portfolio', endpoint: `/portfolio/${id}/`, level: 0 },
    { name: 'Table', endpoint: '/table/', level: 1 },
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
            ? <li key={route.name} className={styles.disabled}>{ route.name }</li>
            : (
              <Link key={route.name} to={route.endpoint}>
                <li className={route.className}>{ route.name }</li>
              </Link>
            )
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BaseNavBar;
