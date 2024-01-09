import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const {LogoutUser} = useAuth()
    useEffect(()=>{
        LogoutUser()
    },[LogoutUser])
    {toast.success("Logged out successful")}
    return <Navigate to = '/login'/>
 
}

export default Logout