import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstant';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../constants/messageConstant';
import { ADD_ORDER, GET_ORDERS_BY_USER_ID, GET_ORDERS, UPDATE_ORDER } from '../constants/orderConstant';
import queryString from 'query-string';

export const addOrder = (order) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.post(`/api/order/create`, order);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: ADD_ORDER,
            payload: response.data.order
        })

    } catch(err){
        console.log(err)
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}

export const getOrdersByUserId = (userId, limit, page) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/order/${userId}?${paramsString}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: GET_ORDERS_BY_USER_ID,
            payload: response.data
        })
    } catch(err){
        console.log(err)
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}
export const getOrders = (limit, page) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/order?${paramsString}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: GET_ORDERS,
            payload: response.data
        })
    } catch(err){
        console.log(err)
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}
export const updateOrder = (id, data) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.put(`/api/order/${id}`, data);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: UPDATE_ORDER,
            payload: response.data
        })
    } catch(err){
        console.log(err)
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}