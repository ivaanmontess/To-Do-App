function ToDoItem({ task, toggleComplete, confirmDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(task.id)}>
        {task.completed ? '✔' : '✘'} {task.text}
      </span>
      <button onClick={() => confirmDelete(task)}>🗑️</button>
    </li>
  );
}

export default ToDoItem;
