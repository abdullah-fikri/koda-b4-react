import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // semua akun terdaftar
  account: [],
  // user yang sedang login
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.account.push(action.payload);
    },
    setCurrentUser: (state, action) => {
      const { email, password } = action.payload;

      const foundUser = state.account.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (foundUser) {
        state.currentUser = foundUser;
      } else {
        state.currentUser = null;
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addAccount, setCurrentUser, logoutUser } = accountSlice.actions;
export default accountSlice.reducer;
