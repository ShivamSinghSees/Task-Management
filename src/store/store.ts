import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import sideBarReducer from "./slices/sideBarSlice";
import featureReducer from "./slices/featureSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sideBarReducer,
    feature: featureReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
