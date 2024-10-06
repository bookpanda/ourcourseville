import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../types";
import { RootState } from "./store";

interface AssignmentState {
  assignments: Assignment[];
  currentAssignment: Assignment | null;
}

const initialState: AssignmentState = {
  assignments: [],
  currentAssignment: null,
};

export const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    setCurrentAssignment: (state, action: PayloadAction<Assignment>) => {
      state.currentAssignment = action.payload;
    },
  },
});

export const { setAssignments, setCurrentAssignment } = assignmentSlice.actions;
export const selectAssignments = (state: RootState) =>
  state.assignment.assignments;
export const selectCurrentAssignment = (state: RootState) =>
  state.assignment.currentAssignment;

export default assignmentSlice.reducer;
