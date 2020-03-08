import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import HeaderBar from 'pages/Header/Header';
import Portfolio from 'pages/Portfolio/Portfolio';
import styles from './App.scss';
import './globals.scss';

const App: FC = () => (
  <Provider store={store}>
    <Router>
      <div className={styles.app}>
        <HeaderBar />
        <Switch>
          <Route path="/portfolio"><Portfolio /></Route>
        </Switch>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

export default App;
