import { createContext, useContext } from "react";

//! Creating the Context
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Sample Task",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

//! Creating the Context Provider
export const TodoProvider = TodoContext.Provider;

//! Crating a Hook to use the Todo Context
export const useTodo = () => {
  return useContext(TodoContext);
};
