import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {taskMiddleware} from 'react-palm/tasks';
import {BrowserRouter} from "react-router-dom";

import Routes from "./routes";

import "../styles/main.scss";

import rootReducer from './reducers/index';

export default function App() {

  const store = createStore(rootReducer, applyMiddleware(taskMiddleware));

  return <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
  </Provider>;
}