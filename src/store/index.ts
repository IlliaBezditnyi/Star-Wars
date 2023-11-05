import {configureStore} from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export default store;

// Define two additional types for creating custom hooks based on them.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
