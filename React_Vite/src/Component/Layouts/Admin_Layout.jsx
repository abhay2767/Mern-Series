/* eslint-disable react/prop-types */
import { Link, Outlet } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { MdHomeRepairService } from "react-icons/md";
import { useAuth } from '../../store/auth';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LoadingSpiner from '../LoadingSpiner';

const Admin_Layout = ({ setProgress }) => {
    const { user, isLoading, isLoggedIn } = useAuth();
    // console.log("User is :- " + JSON.stringify(user))

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    /* change name in title */
    document.title = `${capitalize('Admin')} - React_veet`;

    let location = useLocation();
    useEffect(() => {
        setProgress(10)
        // console.log(location.pathname)
        setProgress(50)
        setTimeout(() => {
            setProgress(100)
        }, 1500);
    }, [])/* if error [location] */

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }
    if (isLoading) {
        return <LoadingSpiner/>
    }
    if (!user.isAdmin) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Navbar />
            <nav className="Navbar">
                <ul className="nav-list v-class-resp">
                    <Link to="/admin/users"><li><PiUsersThreeFill />Users</li></Link>
                    <Link to="/admin/contacts"><li><TbMessages />Contacts</li></Link>
                    <Link to="/admin/servicepage"><li><MdHomeRepairService />Services</li></Link>
                </ul>
            </nav>
            {location.pathname === "/admin" ? <div className='bg1'></div> : <Outlet />}{/*<Outlet /> It is used when you use nested route so here thats the reason we have use this feature of React Router Dom */}
            <Footer />
        </>
    )
}

export default Admin_Layout