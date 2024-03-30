// Redux
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import rootReducer from "./root-reducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
