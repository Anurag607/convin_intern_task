import { createSlice } from "@reduxjs/toolkit";

const currenDataSlice = createSlice({
  name: "currentData",
  initialState: {
    bucketData: JSON.stringify({ bucketName: ``, bucketDetails: `` }),
    cardData: JSON.stringify({
      cardName: ``,
      cardDetails: ``,
      cardUrl: ``,
      bucketName: ``,
    }),
  },
  reducers: {
    setCurrentBucketData: (state, action) => {
      state.bucketData = action.payload;
    },
    setCurrentCardData: (state, action) => {
      state.cardData = action.payload;
    },
  },
});

export const { setCurrentBucketData, setCurrentCardData } =
  currenDataSlice.actions;

export default currenDataSlice.reducer;
