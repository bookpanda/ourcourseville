import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Record } from "../types";
import { RootState } from "./store";

interface RecordState {
  records: Record[];
  currentRecord: Record | null;
}

const initialState: RecordState = {
  records: [],
  currentRecord: null,
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    setCurrentRecord: (state, action: PayloadAction<Record>) => {
      state.currentRecord = action.payload;
    },
  },
});

export const { setRecords, setCurrentRecord } = recordSlice.actions;
export const selectRecords = (state: RootState) => state.record.records;
export const selectCurrentRecord = (state: RootState) =>
  state.record.currentRecord;

export default recordSlice.reducer;
