import { createSlice } from "@reduxjs/toolkit";

const openGridSlice = createSlice({
  name: "openGrid",
  initialState: {
    isGridOpen: false,
  },
  reducers: {
    openGrid: (state) => {
      state.isGridOpen = true;
    },
    closeGrid: (state) => {
      state.isGridOpen = false;
    },
  },
});

export const { openGrid, closeGrid } = openGridSlice.actions;

export default openGridSlice.reducer;
