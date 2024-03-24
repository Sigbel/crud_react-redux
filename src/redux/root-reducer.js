import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "../redux/counter/counterSlice";

const rootReducer = combineReducers({
    counter: counterReducer});

export default rootReducer;