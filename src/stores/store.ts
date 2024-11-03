import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
} from 'redux-persist';

import { authSlice } from '@/stores/features/auth/authSlice';
import { counterSlice } from '@/stores/features/counter/counterSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [PERSIST, REHYDRATE],
        },
      }),
  });
};

export const makePersistor = (store: ReturnType<typeof makeStore>) => {
  return persistStore(store);
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
