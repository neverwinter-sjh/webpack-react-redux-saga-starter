import React from 'react';
import { Route, Switch, Linkm, } from 'react-router-dom';
import CounterContainer from 'containers/CounterContainer';
import Home from 'routes/Home';
import About from 'routes/About';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  )
};

export default App;