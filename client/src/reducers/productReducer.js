import * as R from 'ramda';
import { FETCH_PRODUCT_SUCCESS } from '../actions/types'

const InitialState = {};

export default (state=InitialState, action)=>{
    switch(action.type) {
        case FETCH_PRODUCT_SUCCESS :
        {
            const newValue = R.indexBy(R.prop('code'), action.payload);
            return R.merge(state,newValue);
        }
           default:
            return state;
    }};