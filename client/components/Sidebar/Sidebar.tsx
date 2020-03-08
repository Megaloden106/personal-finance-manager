import React, {
  FC,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { portfolioByTypeSelector } from 'store/selectors/portfolios/PortfolioSelector';
import Dropdown from 'components/Dropdown/Dropdown';
import { DropdownMenuItem } from 'components/Dropdown/Dropdown.models';
import { getClassName } from 'utils/react-util';
import PortfolioList from './PortfolioList/PortfolioList';
import styles from './Sidebar.scss';

const menuItems = [
  { label: 'Returns' },
  { label: 'Percentage' },
  { label: 'APR' },
];

const Sidebar: FC = () => {
  const portfoliosByType = useSelector(portfolioByTypeSelector);
  const [selected, setSelected] = useState('Returns');
  const [isMenuOpen, setMenu] = useState(false);
  const dropdownAnchor = useRef(null);

  const onRowClick = useCallback(({ label }: DropdownMenuItem) => setSelected(label), []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h3>Portfolios</h3>
        <button
          ref={dropdownAnchor}
          type="button"
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
        ) : (
          null
        )
      ))}
      {isMenuOpen && (
        <Dropdown
          anchor={dropdownAnchor}
          title="View"
          offset={{ y: 41 }}
          selected={selected}
          menuItems={menuItems}
          close={() => setMenu(false)}
          rowClick={onRowClick}
        />
      )}
    </div>
  );
};

export default Sidebar;
