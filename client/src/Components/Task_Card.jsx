import { useTasks } from "../Context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)
function Task_Card({ task }) {

    const {deleteTask} = useTasks();

  return (
    <div className='bg bg-zinc-800 max-w-md w-full p-10 rounded-md' >
    <header className='flex justify-between'>
    <h1 className='text-2-xl font-bold'>{task.title} </h1>
    <div className='flex gap-x-2 items-center'>
        <button
        className="bg bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600"
         onClick={() =>{
            deleteTask(task._id);
        }}>
            Delete</button>
        <button
        className="bg bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        <Link to = {`/tasks/${task._id}`}>Edit</Link> 
        </button>
    </div>
    </header>
    <p className= ' text-slate-300 text-2-xl font-bold'>{task.description} </p>
    <p>
      {dayjs(task.date).utc().format("DD/MM/YYYY")}
    </p>
  </div>
  )
}

export default Task_Card