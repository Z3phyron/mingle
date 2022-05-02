import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../users/userServices";

const initialState = {
  friends: [],
  allUsers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new post
export const allUsers = createAsyncThunk(
  "user/all",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.allUsers( token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Create new post
export const followUser = createAsyncThunk(
  "user/follow",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // const userId = thunkAPI.getState().auth.user.user._id;
      return await userService.followUser(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new post
export const getFriends = createAsyncThunk(
  "user/friends",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.user._id
      return await userService.getFriends(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Create new post
export const getFriend = createAsyncThunk(
  "user/friend",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
       const userId = thunkAPI.getState().auth.user.user._id;
      return await userService.getFriend(userId, id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);







export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(followUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(followUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.friends = action.payload;
      // })
      // .addCase(followUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })

  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

