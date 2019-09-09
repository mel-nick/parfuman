import { INCREMENT_QUANTITY, DECREMENT_QUANTITY, CHANGE_QUANTITY } from "./types";

export const incrementQuantity = (quantity, availability) => {
    if (quantity < availability)
    return { type: INCREMENT_QUANTITY }
    else return {type: ''}
}
export const decrementQuantity = () => {
    return { type: DECREMENT_QUANTITY }
}
export const changeQuantity = (quantity) => {
    return { type: CHANGE_QUANTITY, payload: quantity }

}