import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "guest",
    bIsLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.username = action.payload.displayName;
      state.bIsLoggedIn = true;
    },
    logout: (state) => {
      state = {
        username: "guest",
        bIsLoggedIn: false,
      };
    }
  },
});

// console.log(userSlice);

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
