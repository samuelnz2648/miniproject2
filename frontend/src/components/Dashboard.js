// frontend/src/components/Dashboard.js

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TodoContext } from "../context/TodoContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const [todoListName, setTodoListName] = useState("");
  const [savedTodoLists, setSavedTodoLists] = useState([]);
  const [selectedTodoList, setSelectedTodoList] = useState("");
  const { setTodos, setTodoListName: setContextTodoListName } =
    useContext(TodoContext);
  const { authToken, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      axios
        .get("http://localhost:3001/todos", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => setSavedTodoLists(response.data))
        .catch((error) =>
          console.error("Error fetching saved todo lists:", error)
        );
    }
  }, [authToken]);

  const handleContinue = async (event) => {
    event.preventDefault();
    try {
      console.log("handleContinue triggered");
      if (savedTodoLists.includes(todoListName)) {
        const response = await axios.get(
          `http://localhost:3001/todos/${todoListName}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log("Existing list loaded:", response.data);
        setContextTodoListName(todoListName);
        setTodos(response.data);
      } else {
        await axios.post(
          `http://localhost:3001/todos/${todoListName}`,
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log("New list created");
        setContextTodoListName(todoListName);
        setTodos([]);
        setSavedTodoLists([...savedTodoLists, todoListName]);
      }
      navigate("/todos");
    } catch (error) {
      console.error("Error creating/loading the todo list:", error);
    }
  };

  const handleLoad = async () => {
    if (selectedTodoList) {
      try {
        const response = await axios.get(
          `http://localhost:3001/todos/${selectedTodoList}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log("List loaded:", response.data);
        setContextTodoListName(selectedTodoList);
        setTodos(response.data);
        navigate("/todos");
      } catch (error) {
        console.error("Error loading the todo list:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedTodoList) {
      try {
        await axios.delete(`http://localhost:3001/todos/${selectedTodoList}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setSavedTodoLists(
          savedTodoLists.filter((name) => name !== selectedTodoList)
        );
        setSelectedTodoList("");
      } catch (error) {
        console.error("Error deleting the todo list:", error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">{`Welcome ${username}`}</h1>
          <Form onSubmit={handleContinue}>
            <Form.Group className="mb-3" controlId="formTodoListName">
              <Form.Label>Create Todo List</Form.Label>
              <Form.Control
                type="text"
                value={todoListName}
                onChange={(e) => setTodoListName(e.target.value)}
                placeholder="Enter Todo List Name"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Continue to Todo List
            </Button>
          </Form>
          <h2 className="mt-4">Saved Todo Lists</h2>
          <Row>
            <Col>
              <Form.Control
                as="select"
                onChange={(e) => setSelectedTodoList(e.target.value)}
                value={selectedTodoList}
              >
                <option value="" disabled>
                  Select a Todo List
                </option>
                {savedTodoLists.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Button
                variant="success"
                onClick={handleLoad}
                disabled={!selectedTodoList}
                className="w-100"
              >
                Load
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={!selectedTodoList}
                className="w-100"
              >
                Delete
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

export default Dashboard;
