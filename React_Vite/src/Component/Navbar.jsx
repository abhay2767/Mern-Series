import { Link } from 'react-router-dom';
import "./Navbar.css"
import { useAuth } from '../store/auth';
import { MdVerified } from "react-icons/md";

const Navbar = () => {
    const {isLoggedIn} = useAuth()
    const {user, isLoading} = useAuth()
    console.log(user)
    const style = { color: "#00FFFF", fontSize: "1.5em" }
    const style1 = { color: "red", fontSize: "1.0em" }
    
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">
                    </div>
                    <nav>
                        <ul>

                            <Link to="/"><a >Wellcome. <span className='name'>{user && isLoggedIn && !isLoading ? user.name : `Guest`}{ user.is_verified == 1  ? <MdVerified style={style} /> : ""}</span></a></Link>         
                             {user.is_verified !== 1 && isLoggedIn ? <Link to = '/verify-email'><b style={style1}>(Please verify your account)</b></Link>:""}
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

                            {
                                user.isAdmin && !isLoading && isLoggedIn ? <Link to='/admin'><h1 className='button1'>Admin</h1></Link> : <p></p>
                            }

                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar