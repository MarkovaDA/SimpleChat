import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { chatEventReducer } from './reducers/ChatEventsReducer';

//разобраться с этим после
//const socket = io('http://localhost:8000');
//const socketIoMiddleware = createSocketIoMiddleware(socket);

const Store = createStore (
    chatEventReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={Store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);


