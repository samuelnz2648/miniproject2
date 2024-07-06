// frontend/src/components/LoginPage.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">Welcome</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
          <Button
            variant="secondary"
            className="w-100 mb-3"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
