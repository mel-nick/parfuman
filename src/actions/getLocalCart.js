import { GET_LOCAL_CART } from "./types";

export const getLocalCart = (data) => {
  return {
    type: GET_LOCAL_CART,
    payload: data,
  }
}