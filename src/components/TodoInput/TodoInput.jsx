import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, todoUpdateCancel } from "../../store/todos/todos";

const TodoInput = () => {
  const [todo, setTodo] = useState("");
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const updatingTodo = useSelector((state) => state.todos.isUpdating);

  useEffect(() => {
    if (updatingTodo) setTodo(updatingTodo.description);
    else setTodo("");
  }, [updatingTodo]);

  const handleConfirm = () => {
    if (!todo.length) setAlert(true);
    else {
      if (updatingTodo) dispatch(updateTodo(updatingTodo._id, todo));
      else {
        dispatch(addTodo({ description: todo }));
        setTodo("");
      }
    }
  };

  return (
    <>
      <InputGroup className="mt-3">
        <FormControl
          placeholder="Add or Update your todo here"
          aria-label="Add or Update your todo here"
          aria-describedby="basic-addon2"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleConfirm() : null)}
        />
        <InputGroup.Append>
          <Button variant="primary" onClick={handleConfirm}>
            {updatingTodo ? "Update" : "Add"}
          </Button>
          <Button
            disabled={updatingTodo ? false : true}
            onClick={() => dispatch({ type: todoUpdateCancel.type })}
            variant={updatingTodo ? "secondary" : "outline-secondary"}
          >
            Cancel Update
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <Toast
        style={{
          position: "absolute",
          top: "-110px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        show={alert}
        onClose={() => setAlert(!alert)}
        delay={2000}
        autohide
      >
        <Toast.Body>
          <strong>Please type in your todo</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default TodoInput;
