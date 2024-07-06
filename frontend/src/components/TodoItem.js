// frontend/src/components/TodoItem.js
import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

const TodoItem = ({ todo, index, updateTodo, deleteTodo, completeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);

  const handleConfirm = () => {
    updateTodo(index, newTask);
    setIsEditing(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Row className="mt-3">
              <Col>
                <Button
                  variant="success"
                  onClick={handleConfirm}
                  className="w-100"
                >
                  Confirm
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  className="w-100"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Card.Text
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.task}
            </Card.Text>
            <Row>
              <Col>
                <Button
                  variant="info"
                  onClick={() => setIsEditing(true)}
                  className="w-100"
                >
                  Update
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => deleteTodo(index)}
                  className="w-100"
                >
                  Remove
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  onClick={() => completeTodo(index)}
                  className="w-100"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
