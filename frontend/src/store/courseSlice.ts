import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../types";
import { RootState } from "./store";

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<Course>) => {
      state.currentCourse = action.payload;
    },
  },
});

export const { setCourses, setCurrentCourse } = courseSlice.actions;
export const selectCourses = (state: RootState) => state.course.courses;
export const selectCurrentCourse = (state: RootState) =>
  state.course.currentCourse;

export default courseSlice.reducer;
