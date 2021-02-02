import { GET_FOOTER, EDIT_FOOTER } from '../constants/footerConstant';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstant';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE, CLEAR_MESSAGES } from '../constants/messageConstant';
import axios from 'axios';

export const getFooter = () => async (dispatch) => {
    try {
        const response = await axios.get(`/api/footer`);
        dispatch({
            type: GET_FOOTER,
            payload: response.data.footer[0]
        })
    } catch (err) {
        console.log('Get footer error : ', err);
    }
}

export const editFooter = (idFooter, formData) => async (dispatch) => {
    try{
        console.log('formdata',idFooter, formData)
        
        dispatch({
            type: START_LOADING
        })
        const response = await axios.put(`/api/footer/${idFooter}`, formData);
        console.log(response.data)
  
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: EDIT_FOOTER,
            payload: response.data.footer[0]
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