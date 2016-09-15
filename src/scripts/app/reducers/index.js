import { combineReducers } from 'redux';
import { cars, pics } from './app_reducer';

const appReducer = combineReducers({
    cars
});

export default appReducer;
