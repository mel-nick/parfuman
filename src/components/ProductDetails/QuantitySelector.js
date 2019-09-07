import React, { Component } from 'react';
import { incrementQuantity, decrementQuantity, changeQuantity } from '../../actions/quantity'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReportProblem } from '@material-ui/icons'

function QuantitySelector(props) {

    const { quantity, availability, cart, code, incrementQuantity, decrementQuantity, changeQuantity } = props
    let currentAvailability = availability

    cart.forEach(element => {
        if(element.code === code) {
            currentAvailability -= element.quantity;
        }
    });

    let toastId = 'warn';

    let notify = () => toast(
        <div className = "toast-wrapper toast-wrapper_red">
            <ReportProblem/>
          <div className = "toast-text">
            Максимальное количество в наличии : {currentAvailability}
          </div>
        </div>,
        {
          autoClose: 3000,
          hideProgressBar: true,
          position: toast.POSITION.TOP_CENTER,
          toastId: toastId
        });
      toast.configure()
    return (
        <>
            <div className="quantity-selector">
                <input className="quantity-selector__quantity" value={quantity || ''} onBlur = {isInputEmpty} onChange={(e) => { if (!isNaN(e.target.value)) +e.target.value > currentAvailability ? notify() : changeQuantity (+e.target.value) }}></input>
                <div className="quantity-change-container">
                    <div className="quantity-change-container__increment" onClick={() => quantity == currentAvailability ? notify() : incrementQuantity(quantity, currentAvailability)}>+</div>
                    <div className="quantity-change-container__decrement" onClick={() => decrementQuantity()}>-</div>
                </div>
            </div>
        </>
    )
    function isInputEmpty(e){
        !e.target.value ? changeQuantity(1) : e.target.value = e.target.value 
      }
}



const mapStoreToProps = (store) => {
    return {
        quantity: store.quantity.quantity,
        availability: store.data.availability,
        code: store.data.code,
        cart: store.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementQuantity: (quantity, currentAvailability) => dispatch(incrementQuantity(quantity, currentAvailability)),
        decrementQuantity: () => dispatch(decrementQuantity()),
        changeQuantity: (quantity) => dispatch(changeQuantity(quantity))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(QuantitySelector);








