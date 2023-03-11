import { createSlice } from "@reduxjs/toolkit";

const openIFrameSlice = createSlice({
  name: "openIFrame",
  initialState: {
    isIFrameOpen: false,
    url: "",
  },
  reducers: {
    openIFrame: (state) => {
      state.isIFrameOpen = true;
    },
    closeIFrame: (state) => {
      state.isIFrameOpen = false;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { openIFrame, closeIFrame, setUrl } = openIFrameSlice.actions;

export default openIFrameSlice.reducer;
