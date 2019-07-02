import React, { SFC, useEffect, useState } from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { ClientRect } from '@/shared/styleProps';
import BaseDropdown from '@/components/Dropdown/Base/BaseDropdown';

const SidebarDropdown: SFC = () => {
  const [rect, setRect] = useState<ClientRect>({});

  // Sidebar specific repositioning
  useEffect(() => {
    const getClientRect = () => {
      // Calculate position from body for dropdown
      const anchor = (document.getElementById('sidebar-anchor') as Element)
        .getBoundingClientRect();
      const body = document.body.getBoundingClientRect();
      const width = 180;
      const left = anchor.left - width / 2 - body.left;
      const top = anchor.top + 41 - body.top;

      setRect({ left, top, width });
    };

    getClientRect();
    const subscription: Subscription = fromEvent(window, 'resize')
      .subscribe(getClientRect);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <BaseDropdown title="View" rect={rect} />;
};

export default SidebarDropdown;
