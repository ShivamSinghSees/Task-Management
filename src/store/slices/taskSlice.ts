// Import necessary dependencies
import { upsertTask } from "@/lib/queries";
import { Task, TaskState } from "@/lib/type";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const upsertTaskAsync = createAsyncThunk(
  "tasks/upsertTask",
  async (values: Partial<Task>, { rejectWithValue }) => {
    console.log("object");
    try {
      const response = await upsertTask({ ...values });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("something went wrong");
      }
    }
  }
);

// Create the slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upsertTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        upsertTaskAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        }
      )
      .addCase(upsertTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
