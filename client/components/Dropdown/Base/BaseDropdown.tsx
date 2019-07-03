import React, { FunctionComponent, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fromEvent } from 'rxjs';
import { ClientRect } from '@/shared/styleProps';
import { Item, ItemSelection } from '@/shared/dropdown';
import { AppState } from '@/reducers';
import { setDropdownItems, setItemSelection } from '@/reducers/dropdown';
import Portal from '@/components/Portal/Portal';
import styles from './BaseDropdown.scss';

interface StateProps {
  menu: Item[];
  selected: ItemSelection;
}

interface DispatchProps {
  rowClick(item: Item): void;
  close(): void;
}

interface ParentProps {
  title?: string;
  rect: ClientRect;
}

type BaseDropdownProps = StateProps & DispatchProps & ParentProps;

const BaseDropdown: FunctionComponent<BaseDropdownProps> = ({
  title,
  rect,
  menu,
  selected,
  rowClick,
  close,
}) => {
  const [dropdownStyle, setDropdownStyle] = useState([styles.dropdown]);

  // Event listener for outside click dropdown click
  useEffect(() => {
    // Delayed style for animation
    setDropdownStyle(dropdownStyle.concat(styles.dropdownOpen));

    const closeEvent = (event: Event) => {
      const modal = document.getElementById('dropdown') as HTMLElement;
      if (!modal.contains(event.target as Node)) {
        close();
      }
    };
    const subscription = fromEvent(document, 'click')
      .subscribe(closeEvent);

    return () => subscription.unsubscribe();
  }, []);

  // Button class based on row
  const buttonClass = (value: string) => {
    const className = [styles.item];
    if (selected.data === value || selected.time === value) {
      className.push(styles.itemSelected);
    }

    return className.join(' ');
  };

  return (
    <Portal rect={rect} target="dropdown">
      <div className={dropdownStyle.join(' ')}>
        {title && (
          <div className={styles.header}>
            <h3>{title}</h3>
          </div>
        )}
        <div className={styles.content}>
          {menu.map(item => (
            <button
              type="button"
              onClick={() => rowClick(item)}
              className={buttonClass(item.text)}
              style={item.style}
              value={item.value}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </Portal>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  menu: state.dropdown.menu as Item[],
  selected: state.dropdown.selected,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  rowClick: (item: Item) => {
    dispatch(setDropdownItems(null));
    dispatch(setItemSelection(item));
  },
  close: () => dispatch(setDropdownItems(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseDropdown);
