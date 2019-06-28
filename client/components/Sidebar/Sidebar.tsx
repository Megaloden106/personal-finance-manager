import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { AppState } from '@/reducers';
import { Portfolio } from '@/reducers/user';
import styles from './Sidebar.scss';
import PortfolioList from './PortfolioList/PortfolioList';

interface SidebarProp {
  portfolios: Portfolio[];
}

const Sidebar: SFC<SidebarProp> = ({ portfolios }) => {

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Portfolios</h3>
        <div>
          <span />
          <span />
          <span />
        </div>
      </div>
      {lists.map(({ list, title }) => (
        list.length ? <PortfolioList list={list} title={title} /> : null
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  portfolios: state.user.portfolios,
});

export default connect(mapStateToProps)(Sidebar as any);
