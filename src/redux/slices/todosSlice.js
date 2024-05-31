import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      { title: "masak", isDone: true },
      { title: "ngoding", isDone: true },
      { title: "tidur", isDone: false },
    ],
  },
  reducers: {
    //initialState diatas bakal masuk ke dalam state dibawah
    addTodo: (state, action) => {
      state.todos.push(action.payload); //jadi bakal kita isi array of object todos diatas dengan payload yang akan kita isi lagi
    },
    deleteTodo: (state, action) => {
      const indextoDelete = action.payload;
      state.todos.splice(indextoDelete, 1);
    },
    updateTodosStatus: (state, action) => {
      const { index, isDone } = action.payload;
      state.todos[index].isDone = isDone;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodosStatus } = todosSlice.actions;

export default todosSlice.reducer;
