import { configureStore } from '@reduxjs/toolkit';

import { counterSlice } from '@/features/counter/counterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
