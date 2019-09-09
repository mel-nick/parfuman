import { ADD_CART_ITEM} from "./types";

export const addCartItem = (item) => {
    return {
      type: ADD_CART_ITEM,
      payload: item
    }
  }