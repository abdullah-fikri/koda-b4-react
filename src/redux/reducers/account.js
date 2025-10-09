import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.account.push(action.payload);
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addAccount, setCurrentUser, logoutUser } = accountSlice.actions;
export default accountSlice.reducer;
