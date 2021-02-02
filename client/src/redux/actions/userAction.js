import { RESET_PASSWORD, UPDATE_PROFILE, UPDATE_NEW_PASSWORD } from '../constants/userConstant';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstant';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE, CLEAR_MESSAGES } from '../constants/messageConstant';
import axios from 'axios';

export const updateProfile = (id, data) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.put(`/api/user/update/${id}`, data);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: UPDATE_PROFILE,
            payload: response.data
        })
        
    } catch (err){
        console.log(err);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}
export const resetPassword = (email) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.post(`/api/auth/reset-password`, { email });
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: RESET_PASSWORD
        })
    } catch (err){
        console.log(err);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}
export const updateNewPassword = (data) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.post(`/api/auth/update-new-password`, data);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: UPDATE_NEW_PASSWORD
        })
    } catch (err){
        console.log(err);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}