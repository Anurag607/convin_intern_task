import { combineReducers } from "redux";
import openFormReducer from "./openFormSlice";
import openCardFormReducer from "./openCardFormSlice";
import currentBucketSlice from "./currentBucketSlice";
import openGridSlice from "./openGridSlice";
import currentCardSlice from "./currentCardSlice";
import openIFrame from "./iframe";
import currentData from "./currentData";
import historySlice from "./history";
import rowListSlice from "./rowSelection";

export default combineReducers({
  openForm: openFormReducer,
  cardForm: openCardFormReducer,
  currentBucket: currentBucketSlice,
  openGrid: openGridSlice,
  currentCard: currentCardSlice,
  openiframe: openIFrame,
  currentData: currentData,
  currentHistory: historySlice,
  selectedRowList: rowListSlice,
});
