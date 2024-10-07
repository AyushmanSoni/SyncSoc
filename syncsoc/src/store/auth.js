import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: "member",
    email: "", // Adding email to the initial state
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
    setEmail(state, action) {
      const email = action.payload;
      state.email = email; // Adding email to the state
    },
  },
});

// Exporting the auth actions
export const authActions = authSlice.actions;

// Export the reducer to use it in the store
const reducer = authSlice.reducer;
export default reducer;
