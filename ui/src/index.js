import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoggedIn } from './actions/auth';
import axios from 'axios';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

if (localStorage.bookwormJWT) {
  let token = localStorage.bookwormJWT;
  if (token) {
    var user = {
      isAuthenticated: true,
      token
    };
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    store.dispatch(userLoggedIn(user));
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
