import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
    userDetails: [],
  },
  reducers: {
    login: (state, action) => {
      state.value.push(action.payload);
    },
    register: (state, action) => {
      state.value.push(action.payload);
    },
    logout: (state) => {
      state.value = [];
      state.userDetails = [];
    },
  },
});
export const {
  login: login,
  register: register,
  logout: logout,

} = userSlice.actions;
export default userSlice.reducer;
