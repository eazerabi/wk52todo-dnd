import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Todo App with Drag and Drop</h1>
      <TodoList />
    </div>
  );
};

export default App;
