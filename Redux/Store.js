import { configureStore } from '@reduxjs/toolkit';
import parkingReducer from './parkingSlice';
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    parking: parkingReducer,
    user: userReducer,
  },
});

export default store;
