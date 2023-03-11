import { createSlice } from "@reduxjs/toolkit";

const currentBucketSlice = createSlice({
  name: "currentBucket",
  initialState: {
    bucketId: "",
  },
  reducers: {
    setCurrentBucket: (state, action) => {
      state.bucketId = action.payload;
    },
  },
});

export const { setCurrentBucket } = currentBucketSlice.actions;

export default currentBucketSlice.reducer;
