/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../store/auth";
import Navbar from '../Component/Navbar'
import Footer from "../Component/Footer";
import { Navigate } from 'react-router-dom';
import LoadingSpiner from "../Component/LoadingSpiner";

const Reset_Password = ({ setProgress }) => {
  const { Apipath, isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(user)
    try {
      const response = await fetch(`${Apipath}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email })
      });
      const json = await response.json()
      // console.log(json)

      if (response.ok) {
        toast.success("Mail Send succussful")
        navigate('/')
      }
      else {
        toast.error(json.extra_Error ? json.extra_Error : json.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Reset-Password')} - React_veet`;

  return (
    <>
      <Navbar />
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Reset Password</h1>
              <form method="POST">
                <div>
                  <label className='lable' htmlFor='email'>Email</label>
                  <input type="text" name="email" onChange={handleInput} placeholder='Enter your email' id="email" required autoComplete='off' />
                </div>
              </form>
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

export default Reset_Password