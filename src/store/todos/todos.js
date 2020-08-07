import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    isUpdating: null,
    loading: false,
    lastFetch: null,
  },
  reducers: {
    todosRequest: (todos, action) => {
      todos.loading = true;
    },
    todosRequestFailed: (todos, action) => {
      todos.loading = false;
    },
    todosReceived: (todos, action) => {
      todos.loading = false;
      todos.list = action.payload;
    },
    todosAdded: (todos, action) => {
      todos.list.push(action.payload);
    },
    todosDeleted: (todos, action) => {
      todos.list.splice(action.payload, 1);
    },
    todoCompleted: (todos, action) => {
      const { index, todo } = action.payload;
      todos.list[index].complete = todo.complete;
    },
    todoUpdating: (todos, action) => {
      const updatingTodo = todos.list.find(
        (todo) => todo.id === action.payload
      );
      todos.isUpdating = updatingTodo;
    },
    todoUpdated: (todos, action) => {
      const { index, todo } = action.payload;
      todos.list[index].description = todo.description;
      todos.isUpdating = null;
    },
    todoUpdateCancel: (todos, action) => {
      todos.isUpdating = null;
    },
  },
});

const {
  todosRequest,
  todosRequestFailed,
  todosReceived,
  todosAdded,
  todosDeleted,
  todoCompleted,
  todoUpdated,
} = slice.actions;

export const { todoUpdating, todoUpdateCancel } = slice.actions;

export default slice.reducer;

const url = "/todos";

export const loadTodos = () => (dispatch, getState) => {
  const { lastFetch } = getState().todos;
  const diffInMin = moment().diff(moment(lastFetch), "minutes");
  if (diffInMin < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: todosRequest.type,
      onSuccess: todosReceived.type,
      onError: todosRequestFailed.type,
    })
  );
};

export const addTodo = (todo) =>
  apiCallBegan({
    url,
    method: "post",
    data: todo,
    onSuccess: todosAdded.type,
  });

export const deleteTodo = (id) =>
  apiCallBegan({
    url: `/todos/${id}`,
    method: "delete",
    data: id,
    onSuccess: todosDeleted.type,
  });

export const completeTodo = (id, complete) =>
  apiCallBegan({
    url: `/todos/${id}`,
    method: "patch",
    data: { complete: !complete },
    onSuccess: todoCompleted.type,
  });

export const updateTodo = (id, description) =>
  apiCallBegan({
    url: `/todos/${id}`,
    method: "patch",
    data: { description: description },
    onSuccess: todoUpdated.type,
  });
