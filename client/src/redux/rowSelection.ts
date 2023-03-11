import { createSlice } from "@reduxjs/toolkit";

const rowListSlice = createSlice({
  name: "rowList",
  initialState: {
    rowList: [],
  },
  reducers: {
    setRowList: (state, action) => {
      state.rowList = action.payload;
    },
    clearRowList: (state) => {
      state.rowList = [];
    },
  },
});

export const { setRowList, clearRowList } = rowListSlice.actions;

export default rowListSlice.reducer;
