// frontend/src/components/TodoPage.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoList from "./TodoList";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const TodoPage = () => {
  const [task, setTask] = useState("");
  const { todos, setTodos, todoListName } = useContext(TodoContext);
  const { logout, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (task.trim() === "") return;

    const newTodos = [...todos, { task, completed: false }];
    setTodos(newTodos);
    axios.put(
      `http://localhost:3001/todos/${todoListName}`,
      { todos: newTodos },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    setTask("");
  };

  const handleUpdateTodo = (index, updatedTask) => {
    const newTodos = [...todos];
    newTodos[index].task = updatedTask;
    setTodos(newTodos);
    axios.put(
      `http://localhost:3001/todos/${todoListName}`,
      { todos: newTodos },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    axios.put(
      `http://localhost:3001/todos/${todoListName}`,
      { todos: newTodos },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
  };

  const handleCompleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    axios.put(
      `http://localhost:3001/todos/${todoListName}`,
      { todos: newTodos },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
  };

  const handleFinish = () => navigate("/summary");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">{todoListName}</h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleAddTodo}>
            <Form.Group className="mb-3" controlId="formTask">
              <Form.Label>Enter Your Task</Form.Label>
              <Form.Control
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter Your Task"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Add Todo
            </Button>
          </Form>
          <TodoList
            todos={todos}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}
            completeTodo={handleCompleteTodo}
          />
          <Row className="mt-4">
            <Col>
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard")}
                className="w-100"
              >
                Back
              </Button>
            </Col>
            <Col>
              <Button
                variant="success"
                onClick={handleFinish}
                className="w-100"
              >
                Finish
              </Button>
            </Col>
          </Row>
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

export default TodoPage;
