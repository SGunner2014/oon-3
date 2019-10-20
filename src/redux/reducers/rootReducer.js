import {combineReducers} from 'redux';
import postReducer from './postReducer';
import adminReducer from './adminReducer';
import moderationReducer from './moderationReducer';

export default combineReducers({
    postReducer,
    adminReducer,
    moderationReducer,
});