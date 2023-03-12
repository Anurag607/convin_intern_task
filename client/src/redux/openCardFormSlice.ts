import { createSlice } from "@reduxjs/toolkit";

const openCardFormSlice = createSlice({
  name: "openCardForm",
  initialState: {
    isCardUpdateFormOpen: false,
    isCardAddFormOpen: false,
  },
  reducers: {
    openCardUpdateForm: (state) => {
      state.isCardUpdateFormOpen = true;
    },
    closeCardUpdateForm: (state) => {
      state.isCardUpdateFormOpen = false;
    },
    openCardAddForm: (state) => {
      state.isCardAddFormOpen = true;
    },
    closeCardAddForm: (state) => {
      state.isCardAddFormOpen = false;
    },
  },
});

export const {
  openCardUpdateForm,
  closeCardUpdateForm,
  openCardAddForm,
  closeCardAddForm,
} = openCardFormSlice.actions;

export default openCardFormSlice.reducer;
