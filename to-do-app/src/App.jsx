import { useState, useEffect } from 'react';
import './index.css';
import ToDoForm from './components/ToDoForm';
import ToDoItem from './components/ToDoItem';
import DeleteModal from './components/DeleteModal';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all | completed | pending
  const [theme, setTheme] = useState('dark');
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`container ${theme}`}>
      <div className="header">
        <h1>To-Do App 📝</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>

      <ToDoForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />

      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Todas</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completadas</button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pendientes</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <ToDoItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            confirmDelete={confirmDelete}
          />
        ))}
      </ul>

      {taskToDelete && (
        <DeleteModal
          task={taskToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
