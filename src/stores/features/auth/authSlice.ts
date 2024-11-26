import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '@/stores/store';

export interface AuthState {
  user: {
    _id: string;
    fullName: string;
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
    resetState: () => initialState,
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState): AuthState['user'] =>
  state.auth.user;

export default authSlice.reducer;
