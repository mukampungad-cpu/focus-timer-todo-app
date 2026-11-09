import { useState, useEffect, useRef } from "react";

function TodoPage() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  // Focus input when page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  // Update browser tab title
  useEffect(() => {
    document.title = `${remainingTasks} tasks remaining`;
  }, [remainingTasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);
    setNewTask("");
    inputRef.current?.focus();
  };

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>
      <p>Organize your day and achieve your goals.</p>

      <form onSubmit={addTask} className="task-form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-summary">
        <h3>Total Tasks: {tasks.length}</h3>
        <h3>Remaining: {remainingTasks}</h3>
        <h3>Completed: {tasks.length - remainingTasks}</h3>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {task.title}
            </label>

            <button
              type="button"
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="empty-message">No tasks yet. Add your first task!</p>
      )}
    </div>
  );
}

export default TodoPage;