import axios from 'axios'
import { EMPTY_CART } from './types';

export const submitCheckout = (data,onSuccess, onFail) => async dispatch =>{
  try {
    await axios.post('/checkout', { data })
    .then(() => onSuccess('Спасибо за Ваш заказ!'))
    .then(() => dispatch({ type: EMPTY_CART }))
  } catch (err) {
    await onFail(`Проблемы с соединение ${err}`)
  }
}

export const emptyCart = () => ({ type: EMPTY_CART })