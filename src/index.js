import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import App from './App';
import AppSymbols from './AppSymbols';
import AppImg from './AppImg';
import AppNames from './AppNames';
import Header from './header';
import Footer from './footer';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={App}/>
        <Route path="/appimg" component={AppImg}/>
        <Route path="/appsymbols" component={AppSymbols}/>
        <Route path="/appnames" component={AppNames}/>
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
