import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
);

store.subscribe(throttle(() => {
  const { notes, nextId } = store.getState();

  saveState({
    notes,
    nextId,
  });
}, 1000));

export default store;
