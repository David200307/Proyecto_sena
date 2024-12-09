import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status (500).json ({message: "Task not found"})

    }
}
  

export const createTask = async (req, res) => {

    const {title, description, date} = req.body
    const newTask = new Task ({
        title,
        description,
        date,
        user: req.user.id
    });
    const savedTask = await newTask.save();
    res.json(savedTask)
 

}
   

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user')
    if (!task) return res.status(404).json({Message: "Task not found"})
    res.json(task)
    } catch (error) {
        return res.status (404).json ({message: "Task not found"})
    }

}
  
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({Message: "Task not found"})
<<<<<<< HEAD
return res.sendStatus (204).json({message: "TASK DELETE"});
=======
return res.sendStatus (204);
>>>>>>> 6aa91070582c583b849e574f184e8ec15c84bc12
    } catch (error) {
        return res.status (404).json ({message: "Task not found"})

    }
}

export const updateTask = async (req, res) => {
   try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    if (!task) return res.status(404).json({Message: "Task not found"})
    res.json(task)
   } catch (error) {
    return res.status (404).json ({message: "Task not found"})

   }
}