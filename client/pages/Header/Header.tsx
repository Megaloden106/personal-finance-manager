import React, { FC, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Dropdown from 'components/Dropdown/Dropdown';
import { DropdownMenuItem } from 'components/Dropdown/Dropdown.models';
import { AppState } from 'store/models/store';
import { updateSidepanelStatusAction, updateSidepanelTabAction } from 'store/actions/sidepanel';
import { SidepanelTab } from 'store/models/sidepanel';
import styles from './Header.scss';

const routes = ['Portfolio', 'History', 'Holdings'];

const menuItems = [
  { label: SidepanelTab.Portfolio },
  { label: SidepanelTab.DataPoint },
];

const HeaderBar: FC = () => {
  const username = useSelector((state: AppState) => state.user.username);
  const dispatch = useDispatch();

  const [isMenuOpen, setMenu] = useState(false);
  const dropdownAnchor = useRef(null);

  const onRowClick = ({ label }: DropdownMenuItem) => {
    dispatch(updateSidepanelStatusAction(true));
    dispatch(updateSidepanelTabAction(label as SidepanelTab));
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Personal Finance MS</h1>
        <h3 className={styles.user}>{ username }</h3>
      </div>
      <div className={styles.navBar}>
        <nav className={styles.nav}>
          <ul>
            {routes.map(route => (
              <li>
                <NavLink
                  className={styles.tab}
                  activeClassName={styles.tabSelected}
                  role="button"
                  to={`/${route.toLowerCase()}`}
                >
                  {route}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          ref={dropdownAnchor}
          className={styles.createBtn}
          onClick={() => setMenu(true)}
        >
          <span>+&nbsp;</span>
          Create
        </button>
      </div>
      {isMenuOpen && (
        <Dropdown
          anchor={dropdownAnchor}
          title="Create New"
          menuItems={menuItems}
          close={() => setMenu(false)}
          rowClick={onRowClick}
        />
      )}
    </>
  );
};

export default HeaderBar;
