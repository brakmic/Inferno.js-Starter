import expect from 'expect';
import * as actions from '../src/scripts/app/actions/action_creators';
import * as types from '../src/scripts/app/actions/action_types';

describe('actions', () => {
  it('should create an action to add a car', () => {
    const car = {
        id: 0,
        name: 'BMW',
        make: 'BMW',
    };
    const expectedAction = {
      type: types.ADD_CAR,
      car
    };
    expect(actions.addCar(car)).toEqual(expectedAction)
  });

  it('should create an action to set a picture', () => {
    const picture = {
        id: 0,
        name: 'BMW'
    };
    const expectedAction = {
      type: types.SET_PICTURE,
      picture
    };
    expect(actions.setPicture(picture)).toEqual(expectedAction)
  });
});
