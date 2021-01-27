import React from "react";
import Todo from "./components/Todo/Todo";
import { Container, Row, Col, Badge } from "react-bootstrap";

const App = () => {
  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <h1>
            Todo List <Badge variant="warning"> HD</Badge>
          </h1>
          <h6>
            <span className="font-effect-fire-animation">REMASTER</span> of a
            simple TodoList App made by{" "}
            <span className="font-effect-anaglyph">gywreb</span>
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
