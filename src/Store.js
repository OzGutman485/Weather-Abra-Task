import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './PlacesSlice';
import { loadState, saveState } from './localStorageUtils';

const preloadedState = {
  places: loadState() || []
};
const store = configureStore({
  reducer: {
    places: placesReducer
  },
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState().places);
});

export default store;