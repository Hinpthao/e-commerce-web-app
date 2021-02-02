import { ADD_TO_CART, DELETE_ITEM, UPDATE_CART } from '../constants/cartConstant';

var data = JSON.parse(localStorage.getItem('CART'))
const INITIAL_STATE = data ? data : [];

const findProductInCart = (cart, product) => {
    var index = -1;
    if(cart.length > 0){
        for( var i = 0 ; i < cart.length; i++){
            if(cart[i].product._id === product._id){
                index = i;
                break;
            }
        }    
    }
    return index;
}

const cartReducer = (state = INITIAL_STATE, action) => {
    var index = -1;
    switch (action.type){
        case ADD_TO_CART:
            index = findProductInCart(state, action.product)
            if(index !== -1){
                state = state.map((item, i) => {
                    if(i === index) {
                        return {
                            ...item,
                            quantity : item.quantity + action.quantity
                        }
                    } else return item
                })
            } else {
                state = [
                    {
                        product: action.product,
                        quantity : action.quantity
                    },
                    ...state
                ]
            }
            localStorage.setItem('CART', JSON.stringify(state))
            return state;
        case DELETE_ITEM:
            state = state.filter(item => {
                return item.product._id !== action.productId
            })
            localStorage.setItem('CART', JSON.stringify(state))
            return state;
        case UPDATE_CART:
            state = state.map(item => {
                if(item.product._id === action.product._id){
                    return {
                        ...item,
                        quantity : action.quantity
                    }
                } else return item
            })
            localStorage.setItem('CART', JSON.stringify(state))
            return state;
        default:
            return state;
    }
}

export default cartReducer;