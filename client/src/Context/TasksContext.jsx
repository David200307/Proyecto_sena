import { useState } from "react";
import { createContext, useContext } from "react";
import { 
    createTaskRequest, 
    getTasksRequest, 
    deleteTaskRequest,
    getTaskRequest,
    updateTaskRequest, 
} from "../Api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error ("useTasks must be used within a taskprovider")
    }
    return context;
}

export function TaskProvider ({children}){

const [tasks, setTasks] = useState([]);



const getTasks = async () =>{
    try {
        const res = await getTasksRequest()
    console.log(res)
    setTasks(res.data)
    } catch (error) {
        console.error(error);
    }
}

const deleteTask = async (id) =>{
    try {
     const res =await deleteTaskRequest(id);
     if (res.status === 204)setTasks( tasks.filter(task => task._id !== id))
    } catch (error) {
     console.log(error);
    }
 }
const createTask = async (task) =>{
    try {
        const res = await createTaskRequest(task);
        console.log(res.data);
        setTasks(prevTasks => [...prevTasks, res.data]);
      } catch (error) {
        console.log(error);
      }
}

const getTask = async (id) =>{
    try {
    const res = await getTaskRequest(id)
     return res.data
    } catch (error) {
        console.log(error);
    }
}

const updateTask = async (id, updatedTask) => {
    try {
      const res = await updateTaskRequest(id, updatedTask); // Solicitud al backend para actualizar la tarea
  
      if (res.status === 200) {
        // Si la tarea se actualiza correctamente, actualiza el estado en el frontend
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, ...updatedTask } : task
          )
        );
      }
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };
    return(
        <TaskContext.Provider value = {{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask,
        }}> 
         {children}
        </TaskContext.Provider>
    );
}

