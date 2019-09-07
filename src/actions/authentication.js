import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  FETCH_USERS_ORDERS,
  START,
  FAIL,
  SUCCESS,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_ADDRESSES
} from './types';

import setAuthToken from '../setAuthToken';

export const registerUser = (user, history) => (dispatch) => {
  axios.post('/register', user)
    .then(res => history.push('/login'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

export const loginUser = user => (dispatch) => {
  axios.post('/login', user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};


export const logoutUser = history => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  // history.push('/login');
  // history.push('/');
};


export const changeAddresses = (data, user_id) => async dispatch => {
  const res = await axios.post('user_customize', { data, user_id })
  console.log(res)
  const isSuccess = res.data.user_customize === 'success'
  dispatch({ type: CHANGE_USER_ADDRESSES, payload: {isSuccess, addresses: data.addresses }})
}

export const changeUserPassword = (data, user_id) => async dispatch => {
  const res = await axios.post('user_customize', { data, user_id })
  const isSuccess = res.data.user_customize === 'success'
  dispatch({ type: CHANGE_USER_PASSWORD, payload: isSuccess })
}

export const fetchUserAddresses = (user_id) => async dispatch => {
  const res = await axios.post('/user_addresses', { user_id })
  dispatch({ type: CHANGE_USER_ADDRESSES, payload: { addresses: res.data.addresses } })
}

export const fetchUsersOrders = (user_id) => async dispatch => {
  dispatch({ type: FETCH_USERS_ORDERS + START })
  let res = {}
  try {
    res = await axios.post('/user_orders', { user_id })
  } catch (err) {
    dispatch({ type: FETCH_USERS_ORDERS + FAIL })
  }
  dispatch({ type: FETCH_USERS_ORDERS + SUCCESS, payload: res.data.orders })
}