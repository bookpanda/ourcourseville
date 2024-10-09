import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cache } from "../cache/localStorage";
import { RECENT_COURSES_TTL } from "../config/config";
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
    pushRecentCourses: (state, action: PayloadAction<Course>) => {
      // Prevent duplicate courses
      const index = state.recentCourses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        // Move the course to the top
        state.recentCourses.splice(index, 1);
        state.recentCourses = [action.payload, ...state.recentCourses];
        return;
      }

      state.recentCourses = [action.payload, ...state.recentCourses];
      if (state.recentCourses.length > 3) {
        state.recentCourses.pop();
      }

      cache.setItem("recentCourses", state.recentCourses, RECENT_COURSES_TTL);
    },
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
