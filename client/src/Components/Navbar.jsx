import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
function Navbar() {

    const {isAuthenticated, logout, user} = useAuth();

  return (
    <nav className=" bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to= {
            isAuthenticated ? "/tasks" : "/"
        }>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
        </Link>
        <ul className=" text-bold flex gap-x-2">
        {isAuthenticated ? (
            <>
             <li className="font-bold text-white">
             Welcome {user.username}
         </li>
         <li>
             <Link to ='add-task' 
            className="bg-indigo-500 font-bold px-4 py-1 rounded-sm"

             >Añade una tarea</Link>
         </li>
         <li>
             <Link to ='/login'
             className="font-bold bg-indigo-500 px-4 py-1 rounded-sm"
             onClick={() => {
                logout()
             }} >Logout</Link>
         </li>
         </>
        ) : (
            <>
            <li>
            <Link to ='/login'
            className="bg-indigo-500 px-4 py-1 rounded-sm"
            >Login</Link>
        </li>
        <li>
            <Link to ='/register'
            className="bg-indigo-500 px-4 py-1 rounded-sm"
            >Register</Link>
        </li>
        </>
        )}
           
        </ul>
    </nav>
  )
}

export default Navbar