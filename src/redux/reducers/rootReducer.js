import {combineReducers} from 'redux';
import postReducer from './postReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    postReducer,
    adminReducer,
});