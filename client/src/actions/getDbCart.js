import { GET_DB_CART} from "./types";

export const getDbCart = (data) => {
    return {
      type: GET_DB_CART,
      payload: data
    }
  }