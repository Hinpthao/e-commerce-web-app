import { ADD_ORDER, GET_ORDERS_BY_USER_ID, GET_ORDERS, UPDATE_ORDER } from '../constants/orderConstant';

const INITIAL_STATE = {
    orders : [],
    order : {},
    _pagination : ''
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ORDER:
            state = {
                ...state,
                order: action.payload
            }
            localStorage.setItem('ORDER', JSON.stringify(state.order))
            localStorage.removeItem('CART')
            return state;

        case GET_ORDERS_BY_USER_ID:
            state = {
                ...state,
                orders : state.orders.concat(action.payload.orders),
                _pagination : action.payload._pagination
            }
            return state;
        case GET_ORDERS:
            state = {
                ...state,
                orders : state.orders.concat(action.payload.orders),
                _pagination : action.payload._pagination
            }
            return state;
        case UPDATE_ORDER:
            state = {
                ...state,
                orders : state.orders.map(item => {
                    if (item._id === action.payload.order._id){
                        return action.payload.order
                    }
                    else return item
                })
            }
            return state;
        default:
            return state;
    }
}

export default orderReducer;