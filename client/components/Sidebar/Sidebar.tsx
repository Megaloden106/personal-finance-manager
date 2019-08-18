import React, { FunctionComponent, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setDropdownItems } from '@/reducers/dropdown';
import SidebarDropdown from '../Dropdown/Sidebar/SidebarDropdown';
import PortfolioList from './PortfolioList/PortfolioList';
import styles from './Sidebar.scss';

interface StateProps {
  portfolios: Portfolio[];
  menu: Item[] | null;
}

interface DispatchProps {
  setMenuItems(items: Item[] | null): void;
}

type SidebarProps = StateProps & DispatchProps;

const Sidebar: FunctionComponent<SidebarProps> = ({ portfolios, menu, setMenuItems }) => {
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

  const handleVisibility = (visible?: boolean) => {
    const items = menu || visible === false ? null : [
      { text: 'Returns', value: 'data' },
      { text: 'Percentage', value: 'data' },
      {
        text: 'APR',
        value: 'data',
        style: { 'border-bottom': '1px solid #eee' },
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

  const [selected, setSelected] = useState<PortfolioFilter>({
    data: 'Returns',
    time: 'Total',
  });

  const handleRowClick = ({ value, text }: Item) => {
    setSelected({
      ...selected,
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
          onClick={() => handleVisibility()}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {lists.map(({ list, title }) => (
        list.length ? <PortfolioList list={list} title={title} /> : null
      ))}
      {menu && (
        <SidebarDropdown
          selected={selected}
          rowClick={handleRowClick}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  portfolios: state.portfolio.list,
  menu: state.dropdown.menu,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setMenuItems: (items: Item[] | null) => dispatch(setDropdownItems(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
