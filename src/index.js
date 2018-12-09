import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { subscribeChatEvents } from './reducers/ChatEventsReducer';


let store = createStore (
  subscribeChatEvents,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


