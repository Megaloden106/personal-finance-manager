import React, {
  SFC,
  useEffect,
  useState,
} from 'react';
import { fromEvent, Subscription } from 'rxjs';
import BaseDropdown, { Selected } from '@/components/Dropdown/Base/BaseDropdown';
import { Position, Box } from '@/components/Modal/Modal';

interface SidebarDropdown {
  close: Function;
  rowClick: Function;
  selected: Selected;
}

const SidebarDropdown: SFC<SidebarDropdown> = ({ close, rowClick, selected }) => {
  const [pos, setPos] = useState<Position>({});
  const [box, setBox] = useState<Box>({});
  const menu = [
    { text: 'Returns', value: 'data' },
    { text: 'Percentage', value: 'data' },
    { text: 'APR', value: 'data', style: { 'border-bottom': '1px solid #eee' } },
    { text: 'Total', value: 'time' },
    { text: 'YTD', value: 'time' },
    { text: '90 Days', value: 'time' },
    { text: '180 Days', value: 'time' },
    { text: '1 Year', value: 'time' },
    { text: '5 Years', value: 'time' },
  ];

  // Sidebar specific repositioning
  useEffect(() => {
    const getClientRect = () => {
      const anchor = document.getElementById('sidebar-anchor');
      const rect = (anchor as Element).getBoundingClientRect();
      const width = 180;

      setPos({ left: rect.left - width / 2, top: rect.top + 41 });
      setBox({ width });
    };
    getClientRect();
    const subscription: Subscription = fromEvent(window, 'resize')
      .subscribe(getClientRect);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BaseDropdown
      menu={menu}
      header="View"
      pos={pos}
      box={box}
      selected={selected}
      rowClick={rowClick}
      close={close}
    />
  );
};

export default SidebarDropdown;
