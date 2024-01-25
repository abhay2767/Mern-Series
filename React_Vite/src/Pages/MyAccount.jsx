/* eslint-disable react/prop-types */
import Navbar from "../Component/Navbar"
import './Design.css'
import { Link,Outlet } from "react-router-dom"


const MyAccount = () => {

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