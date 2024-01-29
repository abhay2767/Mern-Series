/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Component/Navbar'
import Footer from "../Component/Footer";
import { Navigate } from 'react-router-dom';
import LoadingSpiner from "../Component/LoadingSpiner";

const Login = ({ setProgress }) => {
  const navigate = useNavigate();
  const { storeTokenInLs, Apipath, isLoggedIn, isLoading } = useAuth();
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    try {
      const response = await fetch(`${Apipath}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.username, password: user.password })
      });
      const json = await response.json()
      // console.log(json)

      if (response.ok) {
        toast.success("Logged in succussful")
        navigate('/')
      }
      else {
        toast.error(json.extra_Error ? json.extra_Error : json.message)
      }
      // console.log(json.token)
      // localStorage.setItem("Token", json.token);
      storeTokenInLs(json.token)
    } catch (error) {
      console.log(error)
    }
  }

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  /* change name in title */
  document.title = `${capitalize('Login')} - React_veet`;
  useEffect(() => {
    setProgress(10)
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
    }, 1500);
  }, [])

  if (isLoggedIn) {
    return <Navigate to='/' />
  }
  if (isLoading) {
    return <LoadingSpiner/>
  }

  return (
    <>
      <Navbar />
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Login to youre Account</h1>
              <form method="POST">
                <div>
                  <label className='lable' htmlFor='username'>Username</label>
                  <input type="text" name="username" onChange={handleInput} placeholder='Enter your name' id="username" required autoComplete='off' />
                </div>

                <div>
                  <label className='lable' htmlFor='password'>Password</label>
                  <input type="password" name="password" onChange={handleInput} placeholder='Enter your password' id="password" required autoComplete='off' />
                </div>

              </form>
              <div>
                <Link to='/reset-password'><a className="resetpass" >Reset/Forget Password</a></Link>
              </div>
              <div>
                <button type="button" onClick={handleSubmit} className="btn">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login