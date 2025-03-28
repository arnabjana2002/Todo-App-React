import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./Contexts/index.js";
import { TodoForm, TodoItem } from "./Components/index.js";

function App() {
  const [todos, setTodos] = useState([]);

  //* Implementing Add Todo Method
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  //* Implementing Update Todo Method
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  //* Implementing Delete Todo Method
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  //* Implementing Toggle Button
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo
      )
    );
  };

  //! Fetching the stored data from local storage
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    //* If "todos" exist and it's a string of positive lengh, then push it to the state
    if (todos && todos.length > 0) setTodos(todos);
  }, []);

  //! Pushing the data into the local storage, if there is any change in the state
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
