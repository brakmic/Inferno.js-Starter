import {List, Map} from 'immutable';

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_CURRENT_PICTURE':
    return state.set('picture', action.payload);
  case 'SET_CURRENT_CAR':
    return state.set('car', action.payload);
  }
  return state;
}