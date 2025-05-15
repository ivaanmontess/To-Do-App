function ToDoForm ({ newTask, setNewTask, handleSubmit}) {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Agregar nueva tarea..."
                value={newTask}
                onChange={(e)=> setNewTask(e.target.value)}
                />
                <button type="submit">Agregar</button>
        </form>
    );
}

export default ToDoForm;