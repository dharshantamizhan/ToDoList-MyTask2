import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

interface ToDOList {
  TasksName: string;
  complete: boolean;
}

export const ToDo = () => {
  const [TaskName, setTaskName] = useState<string>('');
  const [todos, setTodos] = useState<ToDOList[]>([]);
  const [filterTask, setFilterTask] = useState<ToDOList[]>(todos);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (TaskName.trim() !== '') {
      const newTask: ToDOList = {
        TasksName: TaskName,
        complete: false,
      };
      setTodos([...todos, newTask]);
      setFilterTask([...todos, newTask]);
      setTaskName('');
    }
  };

  const handleCheck = (index: number) => {
    const completeTodos: ToDOList[] = [...todos];
    completeTodos[index] = {
      ...completeTodos[index],
      complete: !completeTodos[index].complete
    };
    setTodos([...completeTodos]);
    setFilterTask([...completeTodos]);
  };

  const handleAll = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setFilterTask([...todos]);
  };

  const handleCompleted = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const completedTodos = todos.filter((todo) => todo.complete);
    setFilterTask(completedTodos);
  };

  const handleTodos = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const notCompletedTodos = todos.filter((todo) => !todo.complete);
    setFilterTask(notCompletedTodos);
  };

  const HandleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const clearTodos = todos.filter((todo) => !todo.complete);
    setFilterTask(clearTodos);
  };

  return (
    <form>
      <div className="form-row">
        <div className="col">
          <input
            id="task"
            type="text"
            value={TaskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="enter the task here"
          />
          <button
            name="submit"
            style={{ margin: '10px' }}
            className="btn btn-primary btn-submit btn-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="card card-box">
          <div className="row">
            <div className="col-12 task-btns">
              <button
                style={{ margin: '10px' }}
                name="submit"
                className="btn btn-secondary btn-md"
                onClick={handleAll}
              >
                ALL
              </button>
              <button
                style={{ margin: '10px' }}
                name="submit"
                className="btn btn-secondary btn-md"
                onClick={handleCompleted}
              >
                COMPLETE
              </button>
              <button
                style={{ margin: '10px' }}
                name="submit"
                className="btn btn-secondary btn-md"
                onClick={handleTodos}
              >
                TODO
              </button>
              <h1>To-Do Application</h1>
              <div className="form-check">
                {filterTask.map((todo, index) => (
                  <div key={index}>
                    <label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={() => handleCheck(index)}
                      />
                      {todo.TasksName}
                    </label>
                  </div>
                ))}
              </div>
              <button
                name="submit"
                className="btn btn-success btn-md"
                onClick={HandleClear}
              >
                CLEAR COMPLETED
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
