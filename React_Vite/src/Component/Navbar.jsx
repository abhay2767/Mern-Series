import "./Navbar.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { MdVerified } from "react-icons/md";
import profile from '../Images/profile.png'

const Navbar = () => {
    const { isLoggedIn } = useAuth()
    const { user, isLoading } = useAuth()
    console.log(user.images)
    const style = { color: "#00FFFF", fontSize: "1.5em" }
    const style1 = { color: "red", fontSize: "1.0em" }

    return (
        <>

            <nav className="Navbar">
                <ul className="nav-list v-class-resp">
                    {/* <p>Wellcome <span className='name'>{isLoggedIn && user && !isLoading ? user.name : "Guest"}{isLoggedIn && user.is_verified == 1 ? <MdVerified style={style} /> : ""}<Link to='/verify-email'>{user && user.is_verified !== 1 && isLoggedIn ? <b style={style1}>(verify your account)</b> : ""}</Link></span></p> */}
                    <p>Wellcome <span className='name'>{isLoggedIn && user && !isLoading ? user.name
                        : "Guest"}{isLoggedIn && user.is_verified == 1 ? <MdVerified style={style} /> : ""}<Link to='/verify-email'>{user && user.is_verified !== 1 && isLoggedIn ? <b style={style1}>(verify your account)</b> : ""}</Link></span></p>
                </ul>
                <ul className="nav-list v-class-resp">

                {
                    user && isLoggedIn && !isLoading ? <img className="profileImg" src={`http://localhost:5000/api/images/${user.images}`} alt="profile" />
                    :
                    <img className="profileImg1" src={profile} alt="profile" /> 
                    
                }

                    {user && !isLoading && isLoggedIn && user.isAdmin ?
                        <Link to='/admin'><h1 className='button'>Admin</h1></Link> : <p></p>
                    }
                    <Link to="/"><a>Home</a></Link>
                    <Link to='/service'><a>Service</a></Link>
                    <Link to='/contact'><a>Contact</a></Link>

                    {isLoggedIn ?
                        <Link to='/logout'><a className='button'>Logout</a></Link>
                        :
                        <>
                            <Link to='/login'><a>Login</a></Link>
                            <Link to='/signup'><a>Signup</a></Link>
                        </>}
                </ul>
            </nav>

        </>
    )
}

export default Navbar