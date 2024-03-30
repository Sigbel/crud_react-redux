import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      if (state.users.length <= 0) {
        state.users = action.payload;
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      console.log(action.payload)
      const { id, data } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      const updatedUsers = [...state.users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...data };
      state.users = updatedUsers;
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const { setUsers, addUser, editUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
