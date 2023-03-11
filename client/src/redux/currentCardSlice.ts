import { createSlice } from "@reduxjs/toolkit";

const currentCardSlice = createSlice({
  name: "currentCard",
  initialState: {
    cardId: "",
  },
  reducers: {
    setCurrentCard: (state, action) => {
      state.cardId = action.payload;
    },
  },
});

export const { setCurrentCard } = currentCardSlice.actions;

export default currentCardSlice.reducer;
