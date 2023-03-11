import { createSlice } from "@reduxjs/toolkit";

const openCardFormSlice = createSlice({
  name: "openCardForm",
  initialState: {
    isCardFormOpen: false,
  },
  reducers: {
    openCardForm: (state) => {
      state.isCardFormOpen = true;
    },
    closeCardForm: (state) => {
      state.isCardFormOpen = false;
    },
  },
});

export const { openCardForm, closeCardForm } = openCardFormSlice.actions;

export default openCardFormSlice.reducer;
