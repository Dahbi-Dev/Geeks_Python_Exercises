import { configureStore } from '@reduxjs/toolkit';
import ageReducer from './ageSlice';

export const store = configureStore({
  reducer: {
    age: ageReducer,
  },
  // Thunk middleware is included by default with Redux Toolkit
});

export default store;
