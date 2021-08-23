import React, { useState, useEffect } from 'react';

import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoListItem from './components/TodoListItem/TodoListItem';

function App() {
  const [tasks, setTasks] = useState(() => {
    const allTasks = localStorage.getItem('allTasks');
    if (allTasks) {
      return JSON.parse(allTasks);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(tasks));
  }, [tasks]);

  const onToggleCompleted = (index) => {
    setTasks((prevTasks) => {
      return prevTasks.map((tasks, curIdx) => {
        if (curIdx === index) {
          return {
            ...tasks,
            completed: !tasks.completed,
          };
        }
        return tasks;
      });
    });
  };

  const onRemoveTask = (index) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((tasks, curIdx) => {
        if (curIdx !== index) {
          return true;
        } else {
          return false;
        }
      });
    });
  };

  const onAddTask = (text) => {
    setTasks((prevTasks) => {
      return [...prevTasks, { text: text, completed: false }];
    });
  };

  return (
    <div className="todo">
      <header className="todo__header">
        <h4>Todo list</h4>
      </header>
      <TodoAdd onAddTask={onAddTask} />
      <ul className="todo__list">
        {tasks.map((item, index) => {
          return (
            <TodoListItem
              key={index}
              index={index}
              text={item.text}
              completed={item.completed}
              onToggleCompleted={onToggleCompleted}
              onRemoveTask={onRemoveTask}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
