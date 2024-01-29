/* eslint-disable react/prop-types */
import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import './Design.css'
import { Link, Outlet } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
import LoadingSpiner from "../Component/LoadingSpiner";

const MyAccount = () => {
    const { user, isLoggedIn, isLoading } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }
    if (isLoading) {
        return <LoadingSpiner/>
    }
    if (!user) {
        return <Navigate to='/login' />
    }

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    /* change name in title */
    document.title = `${capitalize('MyAccount')} - React_veet`;

    return (
        <>
            <Navbar />
            <nav className="Navbar">
                <ul className="nav-list v-class-resp">
                    <Link to="/myAccount/profile"><li>Profile</li></Link>
                    <Link to="/myAccount/update"><li>Update-Profile</li></Link>
                </ul>
            </nav>

            <Outlet />
            <Footer />
        </>
    )
}

export default MyAccount