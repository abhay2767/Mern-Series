import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { MdVerified } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import profile from '../Images/profile.png';

const Navbar = () => {
    const { isLoggedIn, Apipath, user, isLoading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setIsMenuOpen(true);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const style = { color: "#00FFFF", fontSize: "1.5em" }
    const style1 = { color: "red", fontSize: "1.0em" }

    return (
        <>
            <div id="header">
                <div className="container">
                    <nav>
                        <Link to='/myAccount/profile'>
                            {
                                user && isLoggedIn && !isLoading ? <img className="profileImg" src={`${Apipath}/api/images/${user.images}`} alt="profile" />
                                    :
                                    <img className="profileImg1" src={profile} alt="profile" />
                            }
                        </Link>
                        <p className='username'>Wellcome <span className='name'>{isLoggedIn && user && !isLoading ? user.name
                            : "Guest"}{isLoggedIn && user.is_verified == 1 ? <MdVerified style={style} /> : ""}<Link to='/verify-email'>{user && user.is_verified !== 1 && isLoggedIn ? <b className='verfy-account' style={style1}>(verify your account)</b> : ""}</Link></span>
                        </p>

                        <ul id="sidemenu" style={{ right: isMenuOpen ? '0' : '-200px' }}>
                            <li>
                                {user && !isLoading && isLoggedIn && user.isAdmin &&
                                    <Link to='/admin'><h1 className='button'>Admin</h1></Link>
                                }
                            </li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to='/service'>Service</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            {isLoggedIn ?
                                <li><Link to='/logout'><h1 className='button1'>Logout</h1></Link></li>
                                :
                                <>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/signup'>Signup</Link></li>
                                </>
                            }
                            <i className="fa fa-solid fa-bars" onClick={handleMenuClose}><IoMdCloseCircle /></i>
                        </ul>
                        <i className="fa fa-solid fa-bars" onClick={handleMenuOpen}><GiHamburgerMenu /></i>
                    </nav>
                </div>
            </div>

        </>
    );
};

export default Navbar;