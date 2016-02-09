export function setCurrentPicture(name){
  return {
    type: 'SET_CURRENT_PICTURE',
    payload: name
  };
}

export function setCurrentCar(name){
  return {
    type: 'SET_CURRENT_CAR',
    payload: name
  };
}