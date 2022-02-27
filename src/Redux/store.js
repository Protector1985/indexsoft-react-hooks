import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import informationSlice from "./informationSlice";

const store = configureStore({
    reducer: {
      informationSlice: informationSlice,
    },
  });
  
  setupListeners(store.dispatch);
  
  export default store;