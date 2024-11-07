import { combineReducers, configureStore } from "@reduxjs/toolkit";
// combinereducers 리듀서 하나로 뭉치기
// configureStore 스토어를 생성하는 함수
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
  }),
});

export default store;
