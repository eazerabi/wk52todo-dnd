import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Learn React DnD' },
    { id: 3, text: 'Build Todo App' },
    { id: 4, text: 'Enhance UI/UX' },
    { id: 5, text: 'Add more features' },
  ]);

  const moveTodo = useCallback((dragIndex, hoverIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, movedTodo);
    setTodos(updatedTodos);
  }, [todos]);

  const editTodo = useCallback((index, newText) => {
    const updatedTodos = todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo));
    setTodos(updatedTodos);
  }, [todos]);

  const deleteTodo = useCallback((index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }, [todos]);

  const moveTodoUp = (index) => {
    if (index === 0) return;
    moveTodo(index, index - 1);
  };

  const moveTodoDown = (index) => {
    if (index === todos.length - 1) return;
    moveTodo(index, index + 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-list-container">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index}
            todo={todo}
            moveTodo={moveTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            moveTodoUp={moveTodoUp}
            moveTodoDown={moveTodoDown}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default TodoList;
