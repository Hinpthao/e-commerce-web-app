import { CREATE_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT_DETAIL, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_SALE, GET_PRODUCTS_NEW, SEARCH_PRODUCT, GET_PRODUCTS_BEST_SELLER } from '../constants/productConstant';

const INITIAL_STATE = {
    products : [],
    _pagination: '',
    product: {}
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CREATE_PRODUCT:
            return {
                ...state,
                products : [action.payload, ...state.products ]
            }
        case GET_PRODUCTS:
            return {
                ...state,
                _pagination : action.payload._pagination,
                products: [...action.payload.products]
            }
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                _pagination : action.payload._pagination,
                products: [...action.payload.products]
            }
        case GET_PRODUCTS_BEST_SELLER:
            return {
                ...state,
                _pagination : action.payload._pagination,
                products: [...action.payload.products]
            }
        case GET_PRODUCTS_SALE:
            return {
                ...state,
                _pagination : action.payload._pagination,
                products: [...action.payload.products]
            }
        case GET_PRODUCTS_NEW:
            return {
                ...state,
                _pagination : action.payload._pagination,
                products: [...action.payload.products]
            }
        case SEARCH_PRODUCT:
            return {
                ...state,
                _pagination : action.payload._pagination,
                products: [...action.payload.products]
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p => p._id !== action.payload._id)
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                products:  state.products.map((item, index) => {
                    if(item._id === action.payload._id) {
                    return action.payload
                    }
                    return item;
                })
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                product : action.payload
            }
        default:
            return state;
    }
}

export default productReducer;