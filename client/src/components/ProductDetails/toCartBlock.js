import React, { Component } from 'react';
import QuantitySelector from './QuantitySelector'
import ToCartButton from './ToCartButton'
import { connect } from 'react-redux'

class ToCartBlock extends Component {
    render() {
        const {availability, cart, code} = this.props
        let currentAvailability = availability

        cart.forEach(element => {
            if(element.code === code) {
                currentAvailability -= element.quantity;
            }
        });

        if (currentAvailability > 0) {
            return (
                <div className="to-cart-container">
                    <QuantitySelector />
                    <ToCartButton />
                    <div className="to-cart-container__availibility">В НАЛИЧИИ</div>
                </div>
            )
        }
        return (
            <div className="to-cart-container">
                <div className="to-cart-container__availibility_out-of-stock">ТОВАР ЗАКОНЧИЛСЯ</div>
            </div>
        )
    }
}
const mapStoreToProps = (store) => {
    return {
        availability: store.data.availability,
        code: store.data.code,
        quantity: store.quantity.quantity,
        cart: store.cart
    }
}
export default connect(mapStoreToProps)(ToCartBlock)