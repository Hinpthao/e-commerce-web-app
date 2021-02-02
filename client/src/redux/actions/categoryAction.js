import { START_LOADING, STOP_LOADING } from '../constants/loadingConstant';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../constants/messageConstant';
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../constants/categoryConstant';
import axios from 'axios';


export const getCategories = () => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.get('/api/category');
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data.categories
        })
    } catch (err) {
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

export const createCategory = (formData) => async dispatch => {
    try{
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        dispatch({
            type: START_LOADING
        })
        const res = await axios.post('/api/category', formData, config)
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: res.data.successMessage
        })
        dispatch({
            type: CREATE_CATEGORY,
            payload: res.data.category
        })

    } catch (err) {
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

export const updateCategory = (id, data) => async dispatch => {
    try{
        const res = await axios.put(`/api/category/update/${id}`, data)
        
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: res.data.successMessage
        })
        dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data.category
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}


export const deleteCategory = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/category/delete/${id}`)
        
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: res.data.successMessage
        })
        dispatch({
            type: DELETE_CATEGORY,
            payload: res.data.category
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: err.response.data.errorMessage
        })
    }
}

