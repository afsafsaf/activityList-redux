import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/todosSlice"; //harus import manual

export default configureStore({
  reducer: { todos: todosReducer }, //penamaan "penamaan todos:" bisa apa saja, nanti pemanggilan state berdasarkan nama ini
});
