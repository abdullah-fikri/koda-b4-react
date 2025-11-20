import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { setAuth, logoutUser } = accountSlice.actions;
export default accountSlice.reducer;
