import { GET_FOOTER, EDIT_FOOTER } from '../constants/footerConstant';

const INITIAL_STATE = {
    footer : {}
}

const footerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FOOTER: 
            return {
                footer : action.payload
            }
        case EDIT_FOOTER:
            return {
                footer : action.payload
            }
        default:
            return state
    }
}   

export default footerReducer;
