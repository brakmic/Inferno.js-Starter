import { Map } from 'immutable';
import { ADD_CAR, SET_PICTURE } from '../actions'

const initialState = new Map();

const cars = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CAR:
      return state.set(action.payload.id, action.payload.data);
    default:
      return state;
  }
}

const pics = (state = initialState, action) => {
   switch (action.type) {
    case SET_PICTURE:
      return state.set(action.payload.id, action.payload.data);
    default:
      return state;
   }
}

export {
  cars,
  pics
}
