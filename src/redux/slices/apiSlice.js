import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_TASKS_API_URL } from "../../utills/apiUrl";
import { getRequest } from "../../utills/requestMethods";

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems", // action type
  GET_TASKS_API_URL // 요청 url
);

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};

//create slice

const apiSlice = createSlice({
  name: "apis", // slice 이름
  initialState: {
    // 초기상태
    getItemsData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected);
  },
}); // slice 객체 저장

export default apiSlice.reducer;
