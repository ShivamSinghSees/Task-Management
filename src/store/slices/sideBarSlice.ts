import { createSlice } from "@reduxjs/toolkit";
const initialState: SideBarState = {
  sidebar: [
    { name: "Home", icon: "home" },
    { name: "Boards", icon: "boards" },
    { name: "Settings", icon: "setting" },
    { name: "Teams", icon: "teams" },
    { name: "Analytics", icon: "analytics" },
  ],
  isLoading: false,
  error: null,
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {},
});

export default sideBarSlice.reducer;
