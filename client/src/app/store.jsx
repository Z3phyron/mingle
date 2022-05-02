import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import emailReducer from "../features/auth/emailSlice";
import postReducer from "../features/posts/postSlice";
import friendReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    post: postReducer,
    friend: friendReducer,
  },
});
