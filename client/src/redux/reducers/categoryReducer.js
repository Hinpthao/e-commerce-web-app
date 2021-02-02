import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../constants/categoryConstant';

const INITIAL_STATE = {
    categories: []
}

const categoryReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case UPDATE_CATEGORY:
            return  {
                ...state,
                categories:  state.categories.map((item, index) => {
                    if(item._id === action.payload._id) {
                        return {
                            ...item, 
                            category : action.payload.category  
                        }
                    }
                    return item;
                })
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(item => item._id !== action.payload._id)
            }
        default :
            return state;
    }
}

export default categoryReducers;