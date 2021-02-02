import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loadingReducer';
import messageReducer from './reducers/messageReducer';
import categoryReducers from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';
import footerReducer from './reducers/footerReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
    loading : loadingReducer,
    messages : messageReducer,
    categories: categoryReducers,
    products : productReducer,
    footer : footerReducer,
    cart : cartReducer,
    orders : orderReducer,
    users : userReducer
})

const initalState = {}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initalState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;