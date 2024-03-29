/* eslint-disable react/prop-types */
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LoadingSpiner from '../LoadingSpiner';
import '../Navbar.css'

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
        return <LoadingSpiner />
    }
    if (!user.isAdmin) {
        return <Navigate to='/' />
    }


    return (
        <>
            <Navbar />
            <div id="header">
                <div className="container">
                    <nav className="data-design">
                        <a><Link to="/admin/users" className='data'>Users</Link></a>
                        <a><Link to='/admin/contacts' className='data'>Contacts</Link></a>
                        <a><Link to='/admin/servicepage' className='data'>Services</Link></a>
                    </nav>
                </div>
            </div>
            {location.pathname === "/admin" ? <div className='bg1'></div> : <Outlet />}{/*<Outlet /> It is used when you use nested route so here thats the reason we have use this feature of React Router Dom */}
            <Footer />
        </>
    )
}

export default Admin_Layout