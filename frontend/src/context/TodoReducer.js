// frontend/src/context/TodoReducer.js
const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_TODOLISTNAME":
      return { ...state, todoListName: action.payload };
    default:
      return state;
  }
};

export default todoReducer;