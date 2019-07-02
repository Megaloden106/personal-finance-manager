import React, { SFC, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '@/reducers';
import { Portfolio } from '@/reducers/user';
import SidebarDropdown from '../Dropdown/Sidebar/SidebarDropdown';
import { Menu, Selected } from '@/shared/dropdown';
import PortfolioList from './PortfolioList/PortfolioList';
import styles from './Sidebar.scss';

interface SidebarProp {
  portfolios: Portfolio[];
}


const Sidebar: SFC<SidebarProp> = ({ portfolios }) => {
  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<Selected>({ data: 'Returns', time: 'Total' });

  // Set up separation of Portfolios
  const groups: Portfolio[] = [];
  const personal: Portfolio[] = [];
  const retirement: Portfolio[] = [];
  const savings: Portfolio[] = [];
  const lists = [
    { list: groups },
    { list: personal, title: 'Personal' },
    { list: retirement, title: 'Retirement' },
    { list: savings, title: 'Savings' },
  ];

  portfolios.forEach((portfolio: Portfolio) => {
    if (portfolio.isGroup) groups.push(portfolio);
    else if (portfolio.isRetirement) retirement.push(portfolio);
    else if (portfolio.isSavings) savings.push(portfolio);
    else personal.push(portfolio);
  });

  const handleVisibility = (visible: boolean) => {
    setDisplayDropdown(visible);
  };

  const handleRowClick = (row: Menu) => {
    handleVisibility(false);
    setTimeout(() => {
      setSelected({
        ...selected,
        [row.value]: row.text,
      });
    }, 200);
  };

  // TODO: Add global dropdown state
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Portfolios</h3>
        <button
          type="button"
          id="sidebar-anchor"
          className={displayDropdown ? styles.menuOpen : undefined}
          onClick={() => handleVisibility(!displayDropdown)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {lists.map(({ list, title }) => (
        list.length ? <PortfolioList list={list} title={title} /> : null
      ))}
      {displayDropdown && (
        <SidebarDropdown
          close={() => handleVisibility(false)}
          selected={selected}
          rowClick={handleRowClick}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  portfolios: state.user.portfolios,
});

export default connect(mapStateToProps)(Sidebar as any);
