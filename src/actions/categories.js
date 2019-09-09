import axios from 'axios'
import {FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from './types';

export const fetchCategories = ()=>{
    
    return async (dispatch)=>{

        try{
            dispatch({
                type: FETCH_CATEGORIES_START
            });
            const categories =  await axios.get(`/categories`);
            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: categories.data
            });
        }catch(err){
            dispatch({
                type: FETCH_CATEGORIES_FAILURE,
                payload: err,
                error: true
            });
        };
    };
};