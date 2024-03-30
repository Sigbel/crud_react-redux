// Redux
import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import usersReducer from "../redux/users/usersSlice";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
