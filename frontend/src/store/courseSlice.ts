import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../types";
import { RootState } from "./store";

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  recentCourses: Course[];
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  recentCourses: [],
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
    setRecentCourses: (state, action: PayloadAction<Course[]>) => {
      state.recentCourses = action.payload;
    },
    pushRecentCourses: (state, action: PayloadAction<Course>) => {},
  },
});

export const {
  setCourses,
  setCurrentCourse,
  setRecentCourses,
  pushRecentCourses,
} = courseSlice.actions;
export const selectCourses = (state: RootState) => state.course.courses;
export const selectCurrentCourse = (state: RootState) =>
  state.course.currentCourse;
export const selectRecentCourses = (state: RootState) =>
  state.course.recentCourses;

export default courseSlice.reducer;
