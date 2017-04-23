import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory , Router, Route } from 'react-router'; 
import App from './components/baseComponent/baseComponent';
import CategoryShop from './components/categoShop/categoryShop'

import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={ App }>
      <Route path="/:category" component={ CategoryShop }/>
    </Route>
  </Router>,
  document.getElementById('root')
);
