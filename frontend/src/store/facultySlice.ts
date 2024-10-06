import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Faculty } from "../types";

interface FacultyState {
  faculties: Faculty[];
}

const initialState: FacultyState = {
  faculties: [],
};

export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Faculty[]>) => {
      state.faculties = action.payload;
    },
  },
});

export const { set } = facultySlice.actions;

export default facultySlice.reducer;
