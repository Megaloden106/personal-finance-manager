import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import PortfolioList from './PortfolioList/PortfolioList';
import { DropdownMenuItem } from '@/components/Dropdown/models/DropdownMenuItem';
import { AppState } from '@/store/models/store';
import { portfolioByTypeSelector } from '@/store/selectors/portfolios/PortfolioSelector';
import { SidebarProps, StateProps } from './models/Sidebar';
import Dropdown from '@/components/Dropdown/Dropdown';
import styles from './Sidebar.scss';
import { getClassName } from '@/utils/react-util';

const Sidebar: FC<SidebarProps> = ({ portfoliosByType, portfolioClick }) => {
  const [selected, setSelected] = useState<string>('Returns');
  const [isMenuOpen, setMenu] = useState<boolean>(false);

  const menuItems = [
    { label: 'Returns' },
    { label: 'Percentage' },
    { label: 'APR' },
  ];

  const handleRowClick = ({ label }: DropdownMenuItem) => setSelected(label);

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3>Portfolios</h3>
        <button
          type="button"
          id="sidebar-anchor"
          className={getClassName({ [styles.menuOpen]: isMenuOpen })}
          onClick={() => setMenu(!isMenuOpen)}
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
      {isMenuOpen && (
        <Dropdown
          anchorId="sidebar-anchor"
          title="View"
          offset={{ x: 41 }}
          selected={selected}
          menuItems={menuItems}
          close={() => setMenu(false)}
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
