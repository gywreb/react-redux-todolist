import React from "react";
import Todo from "./components/Todo/Todo";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <h1>Todo List</h1>
          <h6>
            A Simple TodoList App create with with React, Redux, Bootstrap,
            Express
          </h6>
        </Col>
        <Col xs={12}>
          <Todo />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
