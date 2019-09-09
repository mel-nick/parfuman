import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import QntSelector from './QntSelector';
import {DELETE_CART_ITEM} from '../../actions/types';

class CartItem extends Component {
  render() {
    const {productItem, dispatch} = this.props;
    return (
      <tr className="cart-item">

        <td className="hide-on-mobile">
          <Link to={`/product/${productItem.id}`} style={{backgroundImage: `url(${require(`../../images/img-products/${productItem.img}`)})`}} className="cart-item-link"></Link>
        </td>

        <td>
          <Link to={`/product/${productItem.id}`} className="cart-item-title-link">
            {productItem.category} {productItem.brand} {productItem.title}
          </Link>
        </td>
        
        <td className="cart-item-qnt">
          <QntSelector qnt={productItem.quantity}
                       code={productItem.code}
                       availability={productItem.availability}                      
          />
        </td>

        <td>{productItem.price} грн.</td>

        <td>{productItem.price * productItem.quantity} грн.</td>        
        <td
          className="cart-item-delete"
          onClick={() => {dispatch({type: DELETE_CART_ITEM, payload: productItem.code})}}
          title="Удалить товар">
          Удалить
        </td>        
      </tr>      
    );
  }
}
export default connect()(CartItem);