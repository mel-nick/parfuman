import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

export default function SimpleBreadcrumbs() {
  return (
    <div>      
      <Breadcrumbs>
        <RouterLink className="cart-header-nav-link" to="/">
          Главная
        </RouterLink>
        <RouterLink className="cart-header-nav-link" to="/categories">
          Категории
        </RouterLink>
        <div  className="cart-header-nav-link cart-header-nav-link-black">
          Корзина
        </div>
      </Breadcrumbs>      
    </div>
  );
}