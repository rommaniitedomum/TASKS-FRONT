import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE_TASK_API_URL, GET_TASKS_API_URL } from "../../utills/apiUrl";
import { deleteRequest, getRequest } from "../../utills/requestMethods";

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems", // action type
  GET_TASKS_API_URL // 요청 url
);

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(apiURL, id);
    const options = {
      method: "DELETE",
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};
//delete item

export const fetchDeleteItemData = deleteItemFetchThunk(
  "fetchDeleteItem", // action type
  DELETE_TASK_API_URL
);

//create slice

const apiSlice = createSlice({
  name: "apis", // slice 이름
  initialState: {
    // 초기상태
    getItemsData: null,
    deleteItemData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected)

      .addCase(fetchDeleteItemData.fulfilled, handleFulfilled("deleteItemData"))
      .addCase(fetchDeleteItemData.rejected, handleRejected);
  },
}); // slice 객체 저장

export default apiSlice.reducer;
