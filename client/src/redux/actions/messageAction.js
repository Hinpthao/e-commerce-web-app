import { CLEAR_MESSAGES } from '../constants/messageConstant';

export const clearMessage = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGES,
    })
}
