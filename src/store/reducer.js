import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./todos/todos";

export default combineReducers({
  todos: todosReducer,
});
