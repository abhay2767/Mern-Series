import { Link, Outlet } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { MdHomeRepairService } from "react-icons/md";
import { useAuth } from '../../store/auth';
import { Navigate } from 'react-router-dom';

const Admin_Layout = () => {
    const { user, isLoading } = useAuth();
    console.log("User is :- " + JSON.stringify(user))

    if (isLoading) {
        return <h1>Loading..</h1>

    }

    if (!user.isAdmin) {
        return <Navigate to='/' />
    }
    return (
        <>
            <nav className="Navbar">
                <ul className="nav-list v-class-resp">
                    <Link to="/admin/users"><li><PiUsersThreeFill />Users</li></Link>
                    <Link to="/admin/contacts"><li><TbMessages />Contacts</li></Link>
                    <Link to="/admin/servicepage"><li><MdHomeRepairService />Services</li></Link>
                </ul>
            </nav>

            <Outlet />{/* It is used when you use nested route so here thats the reason we have use this feature of React Router Dom */}
        </>
    )
}

export default Admin_Layout