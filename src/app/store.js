import { configureStore } from "@reduxjs/toolkit";
import { cryptoAPI } from "../services/cryptoAPI";
import { cryptoNewsAPI } from "../services/cryptoNewsAPI";

export default configureStore({
  reducer: {
    [cryptoAPI.reducerPath]: cryptoAPI.reducer,
    [cryptoNewsAPI.reducerPath]: cryptoNewsAPI.reducer,
  },
});
