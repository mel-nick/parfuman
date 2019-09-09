import React, { useEffect } from 'react';
import './Checkout.sass';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import CheckoutCart from './CheckoutCart/CheckoutCart';
import { fetchUserAddresses } from '../../actions/authentication';

function Checkout(props) {
  useEffect(() => {
    if (!props.cart.length) {
      props.history.push('/');
    }
    props.fetchUserAddresses(props.user_id)
  });

  return (
    <div className="Checkout">
      <h1 className="Checkout-title">Оформление заказа</h1>
      <div className="Checkout-content">
        <main className="Checkout-content-forms" children={<CheckoutForm />} />
        <aside className="Checkout-content-cart" children={<CheckoutCart />} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
  user_id: state.auth.user.id
});
const mapDispatchToProps = dispatch => ({
  fetchUserAddresses: (user_id) => dispatch(fetchUserAddresses(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);