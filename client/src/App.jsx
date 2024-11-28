import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Register_Page  from "./Pages/Register_Page";
import  Login_Page  from "./Pages/Login_Page";
import Tasks_Page from "./Pages/Tasks_Page";
import Task_Form_Page from "./Pages/Task_Form_Page";
import Profile_Page from "./Pages/Profile_Page";
import Home_page from "./Pages/Home_page";
import  Protected_Route  from "./Protected_Route";
import { TaskProvider } from "./Context/TasksContext";
import Navbar from "./Components/Navbar";
function App () {
  return(
    <AuthProvider>
      <TaskProvider>
      <BrowserRouter>
      <main className="container mx-auto px-10 ">
      <Navbar/>
          <Routes>
            <Route path="/" element={<Home_page/>}></Route>
            <Route path="/login" element={<Login_Page/>} />
            <Route path="/register" element={<Register_Page/>} />

        <Route element ={<Protected_Route/>}>
            <Route path="/tasks" element={<Tasks_Page/>}></Route>
            <Route path="/add-task" element={<Task_Form_Page/>}></Route>
            <Route path="/tasks/:id" element={<Task_Form_Page/>}></Route>
            <Route path="/profile" element={<Profile_Page/>}></Route>
          </Route>
          </Routes>
      </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
export default App