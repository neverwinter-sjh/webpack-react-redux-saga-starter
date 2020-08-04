import React from 'react';
import CounterContainer from 'containers/CounterContainer';
import Header from 'components/Header';
import RouteBody from 'routes/index';

const App = () => {
  return (
    <div>
      <CounterContainer />
      <Header />
      <RouteBody />
    </div>
  )
};

export default App;