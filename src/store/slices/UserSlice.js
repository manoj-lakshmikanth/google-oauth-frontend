import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loginUser: {},
  },

  reducers: {
    isLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    userDetails: (state, action) => {
      state.user = action.payload;
    },
    loginData: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { isLoggedIn, userDetails, loginData } = userSlice.actions;
