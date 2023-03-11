import { createSlice } from "@reduxjs/toolkit";

const openSlice = createSlice({
  name: "open",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openForm: (state) => {
      state.isOpen = true;
    },
    closeForm: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openForm, closeForm } = openSlice.actions;

export default openSlice.reducer;
