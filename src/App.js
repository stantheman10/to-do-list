import React, { useState, useEffect } from 'react'
import './App.css'





const taskForm = (setIsVisible, message, setMessage, setTasks, tasks) => {
 
  return (
    <form className='form'>
      {/* updates state of message */}
      <input type="text" className='input-task' placeholder='Add Task' onChange={(e) => setMessage(e.target.value)} />
      {/* adds a new task to the tasks array */}
      <button className='button-37' onClick={()=> {
        setIsVisible(false)
        const id = tasks.length + 1;
        const name = message;
        const status = false;
        const newTask = {id, name, status};
        setTasks([...tasks, newTask]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
        console.log(tasks);
        }}>submit</button>
    </form>
  )
}

const toggleSuccess = (tasks, taskId, setTasks) => {
  //toggle the status of the task that is done
  setTasks(tasks.map((task) => task.id === taskId ? {...task, status: !task.status} : task))
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

const deleteTask = (tasks, taskId, setTasks) => {
  //delete the task from the tasks array
  setTasks(tasks.filter((task) => task.id !== taskId))
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const displayTask = (tasks,setTasks) => {
  //display the tasks in a list
  return (
    <ul >
      {tasks.map((task) => {
        return(
          <li className='list-item' key={task.id}>
            <p>{task.name}</p>
            {task.status === false? <button className='button-37' onClick={() => {
              toggleSuccess(tasks, task.id, setTasks);
              console.log(task);
            }}>done</button> : <button className='button-38' onClick={() => {
              deleteTask(tasks, task.id, setTasks);
              console.log(task);
            }}>delete</button>}
            
          </li>
        )
      })}
    </ul>
  )
}


//main app component
export const App = () => {
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
 
 
  const [tasks, setTasks] = useState([]);
  //useState to check if the form is visible
  const [isVisible, setIsVisible] = useState(false);
  //useState to store the message
  const [message, setMessage] = useState('');
  return (
    <div>
      <h1 className='header'>To-do List</h1>
      <nav>
        {/* if the form is visible, display the form, else display the button */}
        {isVisible ? taskForm(setIsVisible, message, setMessage, setTasks, tasks) : <button className='button-36' onClick={() => setIsVisible(true)}>Add Task</button> }
        {/* if the task array is empty, display a message, else display the task list */}
        {tasks.length > 0 ? displayTask(tasks, setTasks) : <p>No tasks</p>}

        {tasks.length > 0 && <button className='button-38' onClick={() => setTasks([])}>Clear All</button>}
      </nav>

    </div>
  )
}



export default App;

