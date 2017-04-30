import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory , Router, Route,IndexRoute } from 'react-router'; 
import App from './components/baseComponent/baseComponent';
import CategoryShop from './components/categoShop/categoryShop';
import Banners from './components/banners/banner';
import Product from './components/products/product';
import Search from './components/search/search';


import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={ App }>
      <IndexRoute component={ Banners }/>
      <Route path="/:category" component={ CategoryShop }/>
      <Route path="/:category/:product" component={ Product }/>
      <Route path="/search/content/:search" component={ Search }/>
    </Route>
  </Router>,
  document.getElementById('root')
);
