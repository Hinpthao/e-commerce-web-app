import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstant';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE, CLEAR_MESSAGES } from '../constants/messageConstant';
import { CREATE_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT_DETAIL,
         GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_SALE, GET_PRODUCTS_NEW, SEARCH_PRODUCT, GET_PRODUCTS_BEST_SELLER,  } from '../constants/productConstant';
import queryString from 'query-string';

export const createProduct = formData => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.post('/api/product', formData);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: CREATE_PRODUCT,
            payload: response.data.product
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

export const getProducts = (limit, page) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit ,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/product?${paramsString}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_PRODUCTS,
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
export const getProductsBestSeller = (limit, page) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit ,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/product/collections/bestSeller?${paramsString}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_PRODUCTS_BEST_SELLER,
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
export const getProductsSale = (limit, page) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit ,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/product/collections/sale?${paramsString}`);
        
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_PRODUCTS_SALE,
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
export const getProductsNew = (limit, page) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit ,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/product/collections/new?${paramsString}`);

        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_PRODUCTS_NEW,
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

export const getProductsByCategory = (slug, limit, page) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            limit ,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/product/category/${slug}?${paramsString}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
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

export const deleteProduct = (productId) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.delete(`/api/product/${productId}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: DELETE_PRODUCT,
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

export const editProduct = (productId, formData) => async dispatch =>{
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.put(`/api/product/${productId}`, formData);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: EDIT_PRODUCT,
            payload: response.data.successMessage
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

export const getProductDetail = (slug) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const response = await axios.get(`/api/product/${slug}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: response.data.product
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
export const searchProduct = (content, limit, page) => async dispatch => {
    try{
        dispatch({
            type: START_LOADING
        })
        const filters = {
            q : content,
            limit ,
            page
        }
        const paramsString = queryString.stringify(filters);
        const response = await axios.get(`/api/product/search/query?${paramsString}`);
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_SUCCESS_MESSAGE,
            payload: response.data.successMessage
        })
        dispatch({
            type: SEARCH_PRODUCT,
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