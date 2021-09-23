import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  handleAuthentication,
  saveAuthStorageHandler,
} from "../../utils/authenticate";

const userData = getUserData();
// creating state slice: I need to pass the name, initial state and the reducers
// this is a schema created in order to get the reducer and actions creators for free
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...handleAuthentication(userData),
  },
  reducers: {
    logout: (state) => {
      //   reducers with the toolkit don't need to follow the immutable way of Redux
      state.user = null;
      state.isAuthenticated = null;
      state.token = null;
      state.expiry = null;
    },
    saveAuthData: (state, action) => {
      const { user, expiry, token } = action.payload;
      saveAuthStorageHandler(action.payload);
      state.user = user;
      state.isAuthenticated = true;
      state.expiry = expiry;
      state.token = token;
    },
  },
});

// exporting the action creators
export const { saveAuthData, logout } = authSlice.actions;

// exporting the reducer creating by the toolkit
export default authSlice.reducer;
