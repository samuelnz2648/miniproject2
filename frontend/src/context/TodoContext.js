// frontend/src/context/TodoContext.js
import React, { createContext, useReducer } from "react";
import todoReducer from "./TodoReducer";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    todoListName: "",
  });

  const setTodos = (todos) => {
    dispatch({ type: "SET_TODOS", payload: todos });
  };

  const setTodoListName = (todoListName) => {
    dispatch({ type: "SET_TODOLISTNAME", payload: todoListName });
  };

  return (
    <TodoContext.Provider value={{ ...state, setTodos, setTodoListName }}>
      {children}
    </TodoContext.Provider>
  );
};
