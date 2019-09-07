import { INCREMENT_CART_ITEM, DECREMENT_CART_ITEM, CHANGE_INPUT_QNT } from "./types";

export const incrementCartItem = (code) => {
  return {
    type: INCREMENT_CART_ITEM,
    payload: code
  }
}

export const decrementCartItem = (code) => {
  return {
    type: DECREMENT_CART_ITEM,
    payload: code
  }
}

export const changeInputQnt = (code, qnt) => {
  return {
    type: CHANGE_INPUT_QNT,
    payload: {quantity: qnt, code: code}
  }
}