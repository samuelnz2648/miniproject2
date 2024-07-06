// frontend/src/components/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/users/register", {
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Account Already Registered. Please enter new details");
      } else {
        console.error("Error registering:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center">Register</h1>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Create Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Create Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button type="submit" variant="primary" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Button
        variant="secondary"
        className="position-fixed bottom-0 end-0 m-3"
        onClick={handleBack}
      >
        Back
      </Button>
    </Container>
  );
};

export default RegisterPage;
