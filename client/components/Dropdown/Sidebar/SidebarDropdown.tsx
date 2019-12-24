import React, { FC, useEffect, useState } from 'react';
import BaseDropdown from '@/components/Dropdown/Base/BaseDropdown';
import { PortalRect } from '@/components/Portal/models/Portal';
import { SidebarDropdownProps } from './models/SidebarDropdown';

const SidebarDropdown: FC<SidebarDropdownProps> = ({
  selected,
  menuItems,
  close,
  rowClick,
}) => {
  const [rect, setRect] = useState<PortalRect>({});

  useEffect(() => {
    // Calculate position from body for dropdown
    const anchor = document.getElementById('sidebar-anchor')
      .getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    const width = 180;
    const left = anchor.left - width / 2 - body.left;
    const top = anchor.top + 41 - body.top;

    setRect({ left, top, width });
  }, []);

  return (
    <BaseDropdown
      selected={selected}
      menuItems={menuItems}
      rect={rect}
      title="View"
      close={close}
      rowClick={rowClick}
    />
  );
};

export default SidebarDropdown;
