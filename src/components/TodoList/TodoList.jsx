import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadTodos,
  deleteTodo,
  completeTodo,
  todoUpdating,
} from "../../store/todos/todos";
import Loader from "react-loader-spinner";
import { ListGroup, ButtonGroup, Button } from "react-bootstrap";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const loading = useSelector((state) => state.todos.loading);
  const updatingTodo = useSelector((state) => state.todos.isUpdating);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  if (loading)
    return (
      <div className="d-flex align-item-center justify-content-center mt-4">
        <Loader type="TailSpin" color="#6c757d" height={100} width={100} />
      </div>
    );

  return (
    <>
      <ListGroup className="mt-4">
        {todos.length ? (
          todos.map(({ _id, description, complete }) => (
            <ButtonGroup key={_id} className="mt-2 mb-2">
              <ListGroup.Item style={{ flexGrow: "1" }}>
                <span
                  style={complete ? { textDecoration: "line-through" } : null}
                >
                  {description}
                </span>
              </ListGroup.Item>
              <ButtonGroup>
                <Button
                  disabled={
                    !updatingTodo
                      ? false
                      : updatingTodo._id === _id
                      ? true
                      : false
                  }
                  style={{ minWidth: "64px" }}
                  onClick={() => dispatch(completeTodo(_id, complete))}
                  variant={
                    complete
                      ? "warning"
                      : !updatingTodo
                      ? "success"
                      : updatingTodo._id === _id
                      ? "outline-success"
                      : "success"
                  }
                >
                  {complete ? "Redo " : "Done"}
                </Button>
                <Button
                  onClick={() =>
                    dispatch({ type: todoUpdating.type, payload: _id })
                  }
                  disabled={complete ? true : false}
                  variant={complete ? "outline-info" : "info"}
                  style={{ minWidth: "102px" }}
                >
                  {!updatingTodo
                    ? "Update"
                    : updatingTodo._id === _id
                    ? "Updating..."
                    : "Update"}
                </Button>
                <Button
                  disabled={
                    !updatingTodo
                      ? false
                      : updatingTodo._id === _id
                      ? true
                      : false
                  }
                  variant={
                    !updatingTodo
                      ? "danger"
                      : updatingTodo._id === _id
                      ? "outline-danger"
                      : "danger"
                  }
                  onClick={() => dispatch(deleteTodo(_id))}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          ))
        ) : (
          <ListGroup.Item className="d-flex align-item-center justify-content-center">
            Empty List
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default TodoList;
