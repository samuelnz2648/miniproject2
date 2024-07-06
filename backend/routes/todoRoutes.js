// backend/routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { users, findUserByUsername } = require("../userStore");

const findTodoListByName = (user, name) => {
  return user.todoLists.find((list) => list.name === name);
};

router.get("/", authMiddleware, (req, res) => {
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const todoListNames = user.todoLists.map((list) => list.name);
  res.status(200).json(todoListNames);
});

router.get("/:todoListName", authMiddleware, (req, res) => {
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { todoListName } = req.params;
  const todoList = findTodoListByName(user, todoListName);
  res.status(200).json(todoList ? todoList.todos : []);
});

router.post("/:todoListName", authMiddleware, (req, res) => {
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { todoListName } = req.params;
  if (!findTodoListByName(user, todoListName)) {
    user.todoLists.push({ name: todoListName, todos: [] });
  }
  res.status(201).json({ message: `Todo list ${todoListName} created.` });
});

router.put("/:todoListName", authMiddleware, (req, res) => {
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { todoListName } = req.params;
  const { todos } = req.body;
  const todoList = findTodoListByName(user, todoListName);
  if (todoList) {
    todoList.todos = todos;
  } else {
    user.todoLists.push({ name: todoListName, todos });
  }
  res.status(200).json({ message: `Todo list ${todoListName} updated.` });
});

router.delete("/:todoListName", authMiddleware, (req, res) => {
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { todoListName } = req.params;
  user.todoLists = user.todoLists.filter((list) => list.name !== todoListName);
  res.status(200).json({ message: `Todo list ${todoListName} deleted.` });
});

module.exports = router;
