import { INCREMENT_QUANTITY, DECREMENT_QUANTITY, CHANGE_QUANTITY, ADD_CART_ITEM } from "../actions/types";
const initialState = {
    quantity: 1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case INCREMENT_QUANTITY:
            return {
                quantity: state.quantity + 1
            }
        case DECREMENT_QUANTITY:
            return {
                quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity
            }
        case CHANGE_QUANTITY:
            return {
                quantity: action.payload
            }
        case ADD_CART_ITEM: 
            return {
                quantity : 1
            }
        default:
            return state;
    }
}