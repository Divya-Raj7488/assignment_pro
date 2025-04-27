import { createSlice } from "@reduxjs/toolkit";

type loginState = {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

const initialLoginState: loginState = {
  isLoggedIn: false,
  user: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {},
});

export default loginSlice.reducer;
