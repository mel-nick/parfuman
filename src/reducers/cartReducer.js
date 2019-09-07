import {
  GET_LOCAL_CART,
  GET_DB_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  CHANGE_INPUT_QNT,
  DELETE_CART_ITEM,
  ADD_CART_ITEM,
  EMPTY_CART
  } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_LOCAL_CART:
      return action.payload;

    case INCREMENT_CART_ITEM: {
      const newArj = state.map(item => {
        if (item.code === action.payload) {
          if (item.quantity < item.availability)
            return { ...item, quantity: item.quantity + 1 };
          else return item;
        }
        else return item;
      });

      // localStorage.setItem('parfumanCart', JSON.stringify(newArj))
      return newArj;
    }

    case DECREMENT_CART_ITEM: {
      const newArj = state.map(item => {
        if (item.code === action.payload) {
          if (item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
          else return item;
        }
        else return item;
      });

      // localStorage.setItem('parfumanCart', JSON.stringify(newArj))
      return newArj;
    }

    case CHANGE_INPUT_QNT: {
      const newArj = state.map(item => {
        if (item.code === action.payload.code) {
          if (+action.payload.quantity < 1) {
            return {...item, quantity: 0};
          }
          if (+action.payload.quantity <= +item.availability) {
            return { ...item, quantity: +action.payload.quantity};
          }
          else {return item;}
        }
        else {return item;}
      });

      // localStorage.setItem('parfumanCart', JSON.stringify(newArj))
      return newArj;
    }

    case DELETE_CART_ITEM: {
      const newArj = state.filter(item => {
        return (item.code !== action.payload);
      });

      // localStorage.setItem('parfumanCart', JSON.stringify(newArj))
      return newArj;
    }
    case ADD_CART_ITEM: {
      const newArj = state.filter(item => {
        if(item.code === action.payload.code) {
          action.payload.quantity += item.quantity
        }
        return item.code !== action.payload.code
      })

      // localStorage.setItem('parfumanCart', JSON.stringify([...newArj, action.payload]))
      return [...newArj, action.payload]
    }
    case EMPTY_CART:
      localStorage.removeItem('parfumanCart')
      return []
    
    case GET_DB_CART: {     
      return action.payload;
    }  
    
    default: return state;
  }
}