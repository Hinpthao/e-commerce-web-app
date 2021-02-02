import { ADD_TO_CART, DELETE_ITEM, UPDATE_CART } from '../constants/cartConstant';

export const addToCart = (product, quantity) => dispatch => {
    console.log(product,typeof(quantity))
    try{
        dispatch({
            type: ADD_TO_CART,
            product,
            quantity
        })
    } catch(err) {
        console.log(err)
    }
}

export const deleteItem = (productId) => dispatch => {
    try {
        dispatch({
            type: DELETE_ITEM,
            productId
        })
    } catch (err){
        console.log(err)
    }
}

export const updateCart = (item, quantity) => dispatch => {
    try {
        dispatch({
            type: UPDATE_CART,
            product : item.product,
            quantity 
        })
    } catch (err){
        console.log(err)
    }
}

