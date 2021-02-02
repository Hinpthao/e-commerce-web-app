import { RESET_PASSWORD, UPDATE_PROFILE } from '../constants/userConstant';

const INITIAL_STATE = {
    users : [],
    user : {}
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_PROFILE:
            state = {
                ...state,
                user : action.payload.user
            }
            localStorage.setItem('user', JSON.stringify({
                _id : action.payload.user._id,
                email : action.payload.user.email,
                username : action.payload.user.username,
                role : action.payload.user.role,
            }))
            return state;
        case RESET_PASSWORD:
            return state;
        default :
            return state;
    }
}

export default userReducer;