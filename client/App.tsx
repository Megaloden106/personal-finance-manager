import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '@/store';
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import Portfolio from '@/pages/Portfolio/Portfolio';
import styles from './App.scss';
import './globals.scss';

const App: FunctionComponent = () => (
  <Provider store={store}>
    <Router>
      <div className={styles.container}>
        <HeaderBar />
        <Switch>
          <Route exact path="/" component={Portfolio} />
          <Route path="/portfolio/" component={Portfolio} />
          <Route path="/table/" component={Portfolio} />
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
