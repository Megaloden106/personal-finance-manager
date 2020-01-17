import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import PortfolioList from './PortfolioList/PortfolioList';
import { DropdownMenuItem } from '@/components/Dropdown/models/DropdownMenuItem';
import { portfolioByTypeSelector } from '@/store/selectors/portfolios/PortfolioSelector';
import Dropdown from '@/components/Dropdown/Dropdown';
import styles from './Sidebar.scss';
import { getClassName } from '@/utils/react-util';

const Sidebar: FC = () => {
  const portfoliosByType = useSelector(portfolioByTypeSelector);

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

export default Sidebar;
