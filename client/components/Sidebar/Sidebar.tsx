import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import SidebarDropdown from '../Dropdown/Sidebar/SidebarDropdown';
import PortfolioList from './PortfolioList/PortfolioList';
import { DropdownMenuItem } from '@/components/Dropdown/Base/models/DropdownMenuItem';
import { AppState } from '@/store/models/store';
import { portfolioByTypeSelector } from '@/store/selectors/portfolios/PortfolioSelector';
import { SidebarProps, StateProps } from './models/Sidebar';
import styles from './Sidebar.scss';

const Sidebar: FC<SidebarProps> = ({ portfoliosByType, portfolioClick }) => {
  const [selected, setSelected] = useState<string>('Returns');
  const [menuItems, setMenuItems] = useState<DropdownMenuItem[] | null>(null);

  const handleAnchorClick = () => {
    const menu = menuItems ? null : [
      { label: 'Returns' },
      { label: 'Percentage' },
      { label: 'APR' },
    ];
    setMenuItems(menu);
  };

  const handleRowClick = ({ label }: DropdownMenuItem) => setSelected(label);

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3>Portfolios</h3>
        <button
          type="button"
          id="sidebar-anchor"
          className={menuItems ? styles.menuOpen : undefined}
          onClick={handleAnchorClick}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {portfoliosByType.map(({ portfolios, label, type }) => (
        portfolios.length ? (
          <PortfolioList
            key={type}
            portfolios={portfolios}
            title={label}
            portfolioClick={portfolioClick}
          />
        ) : null
      ))}
      {menuItems && (
        <SidebarDropdown
          selected={selected}
          menuItems={menuItems}
          close={() => setMenuItems(null)}
          rowClick={handleRowClick}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  portfoliosByType: portfolioByTypeSelector(state.portfolio.list),
});

export default connect(mapStateToProps)(Sidebar);
