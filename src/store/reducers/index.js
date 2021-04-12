import {combineReducers} from 'redux';
import ReservationReducers from './ReservationReducers';

const reducers = {
    reservations: ReservationReducers,
};

const combinedReducer = combineReducers(reducers);

export default combinedReducer;
