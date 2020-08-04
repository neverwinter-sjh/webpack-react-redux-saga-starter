import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'routes/Home';
import About from 'routes/About';

const RouteBody = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  )
};

export default RouteBody;