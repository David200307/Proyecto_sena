
import { useEffect } from "react";
import { useTasks } from "../Context/TasksContext";
import Task_Card from "../Components/Task_Card";
function Tasks_Page() {

  const {getTasks, tasks} = useTasks()
  
  
  useEffect(() =>{
    getTasks()

  }, [])
  if(tasks.length === 0) return (<h1>No tasks</h1>)
  return (
  <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-2">
    {
      tasks.map(task => (
      <Task_Card task ={task} key = {task._id} />
      ))
    }
  </div>
  )
}

export default Tasks_Page