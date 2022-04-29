import { configureStore } from '@reduxjs/toolkit';
import currentUserSlice from './slices/currentUserSlice';

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
