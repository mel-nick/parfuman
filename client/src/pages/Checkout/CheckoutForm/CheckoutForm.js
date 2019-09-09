import React from 'react'
import './CheckoutForm.sass'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { createTextMask } from 'redux-form-input-masks'
import { validate } from '../../../validation/checkout'
import { submitCheckout } from '../../../actions/cart'
import { Button } from '@material-ui/core';
import CustomTextField from './../CustomTextField/CustomTextField'
import { notify } from './../../Toaster/Toaster';

const phoneMask = createTextMask({ pattern: '9 (99) 999 99 99' })
const cardMask = createTextMask({ pattern: '9999 9999 9999 9999' })
const expMask = createTextMask({ pattern: '99/99' })

function Shipping (props) {

  const {
    handleSubmit,
    invalid,
    submitting,
    pristine,
    cart,
    submitCheckout,
    user_id
  } = props

  const submit = async (data) => {
    const onSuccess = (message) => notify('success', message)
    const onFail = (message) => notify('error', message)

    const { cardnumber, exp, cvv, ...rest } = data
    const dataToGo = {
      user_id: user_id,
      address: {...rest},
      card: { cardnumber, exp, cvv },
      order: cart,
    }

    await submitCheckout(dataToGo, onSuccess, onFail)

  }

  return (
    <div className='CheckoutForm'>
      <form onSubmit={handleSubmit(submit)}>
        <h2 className='CheckoutForm-title'>Адрес доставки</h2>
        <div className='CheckoutForm-content'>
          <Field name='firstname' label='Имя' variant='outlined' component={CustomTextField} />
          <Field name='lastname' label='Фамилия' variant='outlined' component={CustomTextField}  />
          <Field name='address' label='Адрес' variant='outlined' component={CustomTextField} />
          <Field name='city' label='Город' variant='outlined' component={CustomTextField} />
          <Field name='email' label='E-mail адрес' variant='outlined' type='email' component={CustomTextField} />
          <Field name='phone' label='Моб. телефон' variant='outlined' type='tel' component={CustomTextField} {...phoneMask}/>
        </div>
        <h2 className='CheckoutForm-title'>Оплата</h2>
        <div className='CheckoutForm-paymentFields'>
          <Field name='cardnumber' type='tel' variant='outlined'label='Номер карты' component={CustomTextField} className='cardnumber' {...cardMask} />
          <Field name='exp' type='tel' variant='outlined' label='мм/гг' component={CustomTextField} className='exp' {...expMask} />
          <Field name='cvv' type='tel' variant='outlined' label='Секретный код' component={CustomTextField} className='cvv' inputProps={{ maxLength: 4 }} />
        </div>
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          className='submit'
          disabled={invalid || submitting || pristine}
          children='Оформить Заказ'
          />
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth.addresses,
  cart: state.cart,
  user_id: state.auth.user.id
})
const mapDispatchToProps = dispatch => ({
  submitCheckout: (data, onSuccess, onFail) => dispatch(submitCheckout(data, onSuccess, onFail)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'checkout',
    validate,
    enableReinitialize: true
  })
)(Shipping)