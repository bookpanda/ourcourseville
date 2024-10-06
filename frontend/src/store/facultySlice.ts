import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Faculty } from "../types";
import { RootState } from "./store";

interface FacultyState {
  faculties: Faculty[];
  currentFaculty: Faculty | null;
}

const initialState: FacultyState = {
  faculties: [],
  currentFaculty: null,
};

export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    setFaculties: (state, action: PayloadAction<Faculty[]>) => {
      state.faculties = action.payload;
    },
    setCurrentFaculty: (state, action: PayloadAction<Faculty>) => {
      state.currentFaculty = action.payload;
    },
  },
});

export const { setFaculties, setCurrentFaculty } = facultySlice.actions;
export const selectFaculties = (state: RootState) => state.faculty.faculties;
export const selectCurrentFaculty = (state: RootState) =>
  state.faculty.currentFaculty;

export default facultySlice.reducer;
