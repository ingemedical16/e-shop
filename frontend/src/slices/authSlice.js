import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
  isAuthenticated: localStorage.getItem("userInfo") ? true : false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated =false;
      localStorage.removeItem("userInfo");
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     userInfo = {
      ...userInfo,
      user:user
     }
     localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
