import React, { FunctionComponent, useEffect, useState } from 'react';
import BaseDropdown from '@/components/Dropdown/Base/BaseDropdown';

const SidebarDropdown: FunctionComponent = () => {
  const [rect, setRect] = useState<PortalRect>({});

  // Calculate position from body for dropdown
  const getPortalRect = () => {
    const anchor = (document.getElementById('sidebar-anchor') as HTMLElement)
      .getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    const width = 180;
    const left = anchor.left - width / 2 - body.left;
    const top = anchor.top + 41 - body.top;

    setRect({ left, top, width });
  };

  useEffect(() => getPortalRect(), []);

  return <BaseDropdown title="View" rect={rect} />;
};

export default SidebarDropdown;
