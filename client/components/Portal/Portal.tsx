import { FC } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './models/Portal';

const portal = document.getElementById('portal');

const Portal: FC<PortalProps> = ({ children }) => ReactDOM.createPortal(children, portal);

export default Portal;
