import expect, { createSpy, spyOn, isSpy } from 'expect';
import { cars } from '../src/scripts/app/reducers/app_reducer';
import * as types from '../src/scripts/app/actions/action_types';

describe('cars reducer', () => {
  
  it('should return the initial state', () => {
    const map = cars(undefined, {});
    expect(
      map.size
    ).toEqual(0);
  });

  it('should handle ADD_CAR', () => {
    const map =  cars(undefined, {
        type: types.ADD_CAR,
        payload: { id: 0, data: { name: 'BMW', make: 'BMW' }}
      });
    expect(
      map.size
    ).toEqual(1);
  });
});
