import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./Contexts/index.js";
import { TodoForm, TodoItem } from "./Components/index.js";

function App() {
  //* State to store the list of todos with an array of objects.
  const [todos, setTodos] = useState([]);

  //* Implementing Add Todo Method
  //* Adds a new todo with a unique ID at the beginning of the list.
  const addTodo = (todo) => {
    //? todo -> Object, includes text & completed status
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  //* Implementing Update Todo Method
  //* Updates an existing todo by replacing it with a new object.
  const updateTodo = (id, todo) => {
    setTodos(
      (prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)) // if existing todo has the same id provided, then replace it with the given todo
    );
  };

  //* Implementing Delete Todo Method
  //* Removes a todo from the list based on its unique ID.
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id)); // Only allow those todos that have different ids other than the given one
  };

  //* Implementing Toggle Button
  //* Toggles the completion status of a todo by flipping the "completed" boolean.
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map(
        (prevtodo) =>
          prevtodo.id === id
            ? { ...prevtodo, completed: !prevtodo.completed } // If the id matches, spread the todo object & then change the desired field
            : prevtodo // Or keep it as it is
      )
    );
  };

  //! Fetching the stored data from local storage
  //* Loads todos from local storage when the component mounts.
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    //* If "todos" exist and it's a string of positive lengh, then push it to the state
    if (todos && todos.length > 0) setTodos(todos);
  }, []);

  //! Pushing the data into the local storage, if there is any change in the state
  //* Saves todos to local storage whenever the state updates.
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
