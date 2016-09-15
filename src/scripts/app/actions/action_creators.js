import { ADD_CAR, SET_PICTURE } from './action_types';

const addCar = (car) => {
  return {
    type: ADD_CAR,
    car
  };
}


const setPicture = (picture) => {
  return {
    type: SET_PICTURE,
    picture
  };
}

export {
  addCar,
  setPicture
}
