/* eslint-disable react/prop-types */
import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import './Design.css'
import { Link, Outlet } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
import LoadingSpiner from "../Component/LoadingSpiner";
import '../Component/Navbar.css'

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
            <div id="header">
                <div className="container">
                    <nav className="data-design">
                        <a><Link to="/myAccount/profile" className='data'>Profile</Link></a>
                        <a><Link to='/myAccount/update' className='data'>Update-Profile</Link></a>
                    </nav>
                </div>
            </div>

            <Outlet />
            <Footer />
        </>
    )
}

export default MyAccount