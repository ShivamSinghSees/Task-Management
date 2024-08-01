import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { initializeUser, clearUser, setLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;
