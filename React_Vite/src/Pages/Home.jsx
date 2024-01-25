/* eslint-disable react/prop-types */
// import Mata from '../Images/Mata.png'
import './Design.css'
import Navbar from '../Component/Navbar'
import { useAuth } from '../store/auth'
import { useEffect } from 'react'
import { Link,Outlet,useLocation } from 'react-router-dom'

const Home = ({setProgress}) => {
  const {userAuthentication} = useAuth()
  useEffect(()=>{
    setProgress(10)
    userAuthentication()
    setTimeout(()=>{
      setProgress(100)
    },1500);
  },[])
  /* Change the first latter of word */
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Home')} - React_veet`;

  let location = useLocation();
  return (
    <>
    <Navbar/>
    <nav className="Navbar">
                <ul className="nav-list v-class-resp">
                    <Link to="/notes"><li>Notes</li></Link>
                    <Link to="/images"><li>Images</li></Link>
                    <Link to="/documents"><li>Documents</li></Link>
                </ul>
            </nav>

            {location.pathname === "/" ? <div className='bg'></div> : <Outlet />}
    </>
  )
}

export default Home