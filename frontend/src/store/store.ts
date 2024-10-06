import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import assignmentReducer from "./assignmentSlice";
import courseReducer from "./courseSlice";
import facultyReducer from "./facultySlice";
import recordReducer from "./recordSlice";

export const store = configureStore({
  reducer: {
    faculty: facultyReducer,
    course: courseReducer,
    assignment: assignmentReducer,
    record: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
