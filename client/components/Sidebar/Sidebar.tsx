import React, { FunctionComponent, useState } from 'react';
import SidebarDropdown from '../Dropdown/Sidebar/SidebarDropdown';
import PortfolioList from './PortfolioList/PortfolioList';
import styles from './Sidebar.scss';

interface SidebarProps {
  portfolios: Portfolio[];
  portfolioClick(portfolio: Portfolio): void;
}

const Sidebar: FunctionComponent<SidebarProps> = ({ portfolios, portfolioClick }) => {
  const [filter, setFilter] = useState<PortfolioFilter>({
    data: 'Returns',
    time: 'Total',
  });

  const [menu, setMenuItems] = useState<Item[] | null>(null);

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

  const handleAnchorClick = () => {
    const items = menu ? null : [
      { text: 'Returns', value: 'data' },
      { text: 'Percentage', value: 'data' },
      {
        text: 'APR',
        value: 'data',
        style: { borderBottom: '1px solid #eee' },
      },
      { text: 'Total', value: 'time' },
      { text: 'YTD', value: 'time' },
      { text: '90 Days', value: 'time' },
      { text: '180 Days', value: 'time' },
      { text: '1 Year', value: 'time' },
      { text: '5 Years', value: 'time' },
    ];
    setMenuItems(items);
  };

  const handleRowClick = ({ value, text }: Item) => {
    setFilter({
      ...filter,
      [value]: text,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Portfolios</h3>
        <button
          type="button"
          id="sidebar-anchor"
          className={menu ? styles.menuOpen : undefined}
          onClick={handleAnchorClick}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {lists.map(({ list, title }) => (
        list.length ? (
          <PortfolioList
            key={`${title}-${list.length}`}
            list={list}
            title={title}
            portfolioClick={portfolioClick}
          />
        ) : null
      ))}
      {menu && (
        <SidebarDropdown
          filter={filter}
          menu={menu}
          close={() => setMenuItems(null)}
          rowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default Sidebar;
