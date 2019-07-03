import React, { FunctionComponent, useEffect, useState } from 'react';
import { ClientRect } from '@/shared/styleProps';
import BaseDropdown from '@/components/Dropdown/Base/BaseDropdown';

const SidebarDropdown: FunctionComponent = () => {
  const [rect, setRect] = useState<ClientRect>({});

  // Calculate position from body for dropdown
  const getClientRect = () => {
    const anchor = (document.getElementById('sidebar-anchor') as HTMLElement)
      .getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    const width = 180;
    const left = anchor.left - width / 2 - body.left;
    const top = anchor.top + 41 - body.top;

    setRect({ left, top, width });
  };

  useEffect(() => getClientRect(), []);

  return <BaseDropdown title="View" rect={rect} />;
};

export default SidebarDropdown;