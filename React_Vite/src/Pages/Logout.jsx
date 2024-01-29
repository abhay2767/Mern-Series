import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const { LogoutUser } = useAuth()

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    /* change name in title */
    document.title = `${capitalize('Logout-page')} - React_veet`;

    useEffect(() => {
        LogoutUser()
    }, [LogoutUser])
    { toast.success("Logged out successful") }
    return <Navigate to='/login' />

}

export default Logout