import { expect } from 'chai';
import {List, Map} from 'immutable';
import {setEntries, next, vote} from '../src/core';

describe('immutability', () => {

  describe('a number', () => {
    function increment(currentState){
      return currentState + 1;
    }
    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });
});
