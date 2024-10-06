import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Faculty } from "../types";
import { RootState } from "./store";

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
    setFaculties: (state, action: PayloadAction<Faculty[]>) => {
      state.faculties = action.payload;
    },
  },
});

export const { setFaculties } = facultySlice.actions;
export const selectFaculties = (state: RootState) => state.faculty.faculties;

export default facultySlice.reducer;
