import { LOAD_PRODUCT_DATA, PRODUCT_LOADING } from "./types";

export const getData = (id) => dispatch => {
    dispatch({type: PRODUCT_LOADING, payload: true})
    fetch(`/find/${id}`)
      .then(res => res.json())
      .then(res => {
        dispatch({type: LOAD_PRODUCT_DATA, payload: res})
        dispatch({type: PRODUCT_LOADING, payload: false})
      })
  }
