import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList';

export default function App() {
  // Function for getting todos from the LocalStorage
  const getLocalTodos = () => {
    let list = localStorage.getItem('todos');
    if (list) {
      return JSON.parse(localStorage.getItem('todos'))
    } else {
      return [];
    }
  };

  // Use States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState(getLocalTodos());
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {        // Save todos to LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <header>
        <h1>Yusuf's Todo List</h1>
      </header>
      <Form
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
      <br />
      <div className='btn-div'>
        <button onClick={deleteAll} className="btn">Remove All</button>
      </div>
    </div>
  );
}

