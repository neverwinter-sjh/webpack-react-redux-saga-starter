import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'modules/index';
import App from './App';
import 'assets/css/style.css';
import 'assets/css/scss.scss';

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware())
);

console.log(process.env.KAKAO_API_KEY);

const render = () => { // this function will be reused
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}