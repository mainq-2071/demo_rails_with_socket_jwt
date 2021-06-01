import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import AppRouter from './routers/AppRouter';
import reportWebVitals from './reportWebVitals';
import socket from './socket/socket';

import {getCurrentUser} from "./redux/service";
import {login} from "./redux/userSlice";
import {setPageLoading} from "./redux/commonSlice";
import {setMessage} from "./redux/messageSlice";

store.dispatch(setPageLoading(true));
getCurrentUser().then((respond) => {
  store.dispatch(login(respond.data));
  store.dispatch(setPageLoading(false));
}).catch(() => {
  store.dispatch(setPageLoading(false));
})

 socket.on('DATA_MESSAGE', function(data) {
  console.log(data)
  store.dispatch(setMessage(data));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
