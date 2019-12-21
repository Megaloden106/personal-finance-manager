import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import HeaderBar from '@/pages/Header/Header';
import Portfolio from '@/pages/Portfolio/Portfolio';
import styles from './App.scss';
import './globals.scss';

const App: FC = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <HeaderBar />
      <Portfolio />
    </div>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

export default App;
