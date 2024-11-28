import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext"


function Protected_Route() {
    const {loading, user, isAuthenticated} = useAuth()
    

    if(loading) return <h1>loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to = '/login' replace/>

  return (
    <Outlet/>
  )
}

export default Protected_Route