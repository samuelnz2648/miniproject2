// frontend/src/components/SummaryPage.js

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";

const SummaryPage = () => {
  const { todos } = useContext(TodoContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const completedTasks = todos.filter((todo) => todo.completed);
  const incompleteTasks = todos.filter((todo) => !todo.completed);

  const handleStartOver = () => navigate("/dashboard");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Summary Page</h1>
      <Row>
        <Col>
          <h2>Completed Tasks</h2>
          <ListGroup>
            {completedTasks.map((todo, index) => (
              <ListGroup.Item key={index}>{todo.task}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h2>Incomplete Tasks</h2>
          <ListGroup>
            {incompleteTasks.map((todo, index) => (
              <ListGroup.Item key={index}>{todo.task}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button
            variant="secondary"
            onClick={() => navigate("/todos")}
            className="w-100"
          >
            Back
          </Button>
        </Col>
        <Col>
          <Button variant="danger" onClick={handleStartOver} className="w-100">
            Start Over
          </Button>
        </Col>
      </Row>
      <Button
        variant="danger"
        className="position-fixed bottom-0 end-0 m-3"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default SummaryPage;
