/* eslint-disable react/prop-types */
import Navbar from "../Component/Navbar"
import './Design.css'
import { Link,Outlet } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useAuth } from "../store/auth";

const MyAccount = () => {
    const {user,isLoggedIn,isLoading} = useAuth();
    if(!isLoggedIn){
        return <Navigate to='/login' />
    }
    if (isLoading) {
        return <h1>Loading..</h1>
    }
    if (!user) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Navbar />
            <nav className="Navbar">
                <ul className="nav-list v-class-resp">
                    <Link to="/myAccount/profile"><li>Profile</li></Link>
                    <Link to="/myAccount/update"><li>Update-Profile</li></Link>
                    <Link to="/myAccount/account"><li>Account-Status</li></Link>
                </ul>
            </nav>

            <Outlet />

        </>
    )
}

export default MyAccount