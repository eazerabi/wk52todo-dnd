import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './TodoItem.css';

const ItemType = 'TODO';

const TodoItem = ({ todo, index, moveTodo, editTodo, deleteTodo, moveTodoUp, moveTodoDown }) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo ? todo.text : '');

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    editTodo(index, text);
    setIsEditing(false);
  };

  const handleMoveUp = () => {
    moveTodoUp(index);
  };

  const handleMoveDown = () => {
    moveTodoDown(index);
  };

  return (
    <div ref={ref} className="todo-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {isEditing ? (
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      ) : (
        <span>{todo ? todo.text : 'Undefined Todo'}</span>
      )}
      <div className="button-group">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        )}
        <button className="delete-button" onClick={() => deleteTodo(index)}>Delete</button>
        <div className="move-button">
          <div className="move-up" onClick={handleMoveUp}>▲</div>
          <div className="move-down" onClick={handleMoveDown}>▼</div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
