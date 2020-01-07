import { combineReducers } from 'redux';

import projectsReducer from './projectsReducer';
import userReducer from './userReducer';
import projectDetailsReducer from './projectDetailsReducer';

export default combineReducers({
    userReducer,
    projectsReducer,
    projectDetailsReducer
})