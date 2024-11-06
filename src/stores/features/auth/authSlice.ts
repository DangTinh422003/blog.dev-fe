import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '@/stores/store';

export interface AuthState {
  user: {
    _id: string;
    fullname: string;
    followerNumber: number;
    followingNumber: number;
    isActivated: boolean;
    createdAt: Date;
    email: string;
    avatar: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
