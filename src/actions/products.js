import axios from 'axios'
import { FETCH_PRODUCT_START, FETCH_PRODUCT_SUCCESS,FETCH_PRODUCT_FAIL } from './types';

export const fetchProducts = ()=>{
    
    return async (dispatch) => {
        try{
            dispatch({
                type: FETCH_PRODUCT_START
            });
            const products = await axios.get(`/categories`);

            dispatch({
                type: FETCH_PRODUCT_SUCCESS,
                payload: products.data
            });
        }catch(err){
            dispatch({
                type: FETCH_PRODUCT_FAIL,
                payload: err,
                error: true
            });
        };
    };
}; 


