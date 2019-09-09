import * as R from 'ramda';
import { FETCH_PRODUCT_SUCCESS } from '../actions/types'

const initialState = {
    ids: []
};

export default (state = initialState,action)=>{
    switch(action.type){
        case FETCH_PRODUCT_SUCCESS:
            return(
                R.merge(state,{
                    ids: R.pluck('code',action.payload)
                })
            );
        
        default:
            return state;
    }
};