import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@/stores/features/auth/authSlice';
import { counterSlice } from '@/stores/features/counter/counterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      auth: authSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
