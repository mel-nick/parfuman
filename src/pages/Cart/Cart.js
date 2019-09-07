import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CartItem from './CartItem';
import Container from '@material-ui/core/Container';
import CloseButton from './CloseButton';
import OrderButton from './OrderButton';
import CartNav from './CartNav';
import '../../styles/Cart/main.scss';

class Cart extends Component {
  componentWillUnmount() {
    if (this.props.cartItems.length !== 0) {
      localStorage.setItem('parfumanCart', JSON.stringify(this.props.cartItems));
    }
    else {
      if (localStorage.getItem('parfumanCart')) {
        localStorage.removeItem("parfumanCart");
      }
    }
  }
  render() {
    const {cartItems} = this.props;
    let sumItems = 0; 
    cartItems.map(item => {
      sumItems = sumItems + item.price * item.quantity;
    });

    return (
      <div>
        <div className='cart-header-bg'>
          <Container maxWidth="md" className='cart-header'>
            <div>              
              <h2 className="cart-header-title">Корзина</h2>
              <CartNav/>
            </div>
            <Link to="/"><CloseButton/></Link>
          </Container>
        </div>
        <Container maxWidth="md">
          <table>
            <thead>
              <tr>
                <th className="hide-on-mobile">Фото</th>
                <th>Товар</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              { cartItems.map(item => (
                  <CartItem key={item.id} productItem={item} />
                ))}
            </tbody>
          </table>
        </Container>

        {cartItems.length != 0 ?
        <Container maxWidth="md" className='cart-footer'>
          <span>Итого {sumItems} грн. </span>
          <Link to="/checkout"> <OrderButton/></Link>
        </Container> :
        <Container maxWidth="md" className="cart-empty">В вашей корзине товаров нет</Container>
        }
      </div>
    )
  }
}
const mapStoreToProps = (store) => {
  return {
    cartItems : store.cart
   }
}
export default connect(mapStoreToProps)(Cart);