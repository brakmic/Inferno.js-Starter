import { createStore } from 'redux';

import appReducer from '../reducers';

const carStore = createStore(appReducer);

export {
    carStore
}
