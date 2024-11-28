import { useForm } from "react-hook-form";
import { useTasks } from "../Context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)

function Task_Form_Page() {
  const {register, handleSubmit, setValue} = useForm()
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if(params.id) {
      updateTask(params.id,{
      ...data,
      date: dayjs.utc(data.date).format()
      });
    }else {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format()
      });
      
    }
    navigate('/tasks')
  })
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        
      
      }
    };
    loadTask();
  }, []);
   
  return (
  <div className="flex h-screen items-center justify-center">
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md flex items-center justify-center">

    <form
     
    onSubmit={onSubmit}>
      <label 
      className="font-bold font-white"
      htmlFor="title"> Title</label>
      <input 
      type="text" 
      placeholder='Tittle' 
      {...register('title')}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      autoFocus
      />
      <label 
      className="font-bold"
      htmlFor="description">Description</label>
      <textarea 
      rows = "3" 
      placeholder='Description'
      {...register('description')}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      ></textarea>
      <label
      className="font-bold"
      htmlFor="date">Date</label>
      <input type="date" {... register('date')} 
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"/>
      <button className="bg bg-indigo-500 px-3 py-2 rounded-md">
        Save
      </button>
    </form>
    </div>
    </div>
  )
}

export default Task_Form_Page