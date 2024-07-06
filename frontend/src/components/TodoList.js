// frontend/src/components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";
import { Container } from "react-bootstrap";

const TodoList = ({ todos, updateTodo, deleteTodo, completeTodo }) => (
  <Container>
    {todos.map((todo, index) => (
      <TodoItem
        key={index}
        todo={todo}
        index={index}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    ))}
  </Container>
);

export default TodoList;
