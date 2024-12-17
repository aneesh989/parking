import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  name: "",
  role: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, role, email } = action.payload;
      state.name = name;
      state.role = role;
      state.email = email;
    },
    resetUserData: (state) => {
      state.name = "";
      state.role = "";
      state.email = "";
    },
  },
});

export const { setUserData, resetUserData } = userSlice.actions;
export default userSlice.reducer;
