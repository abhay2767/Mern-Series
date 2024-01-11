import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Component/Navbar'

const Signup = () => {
  const navigate = useNavigate();
  const { storeTokenInLs,Apipath } = useAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    try {
      const response = await fetch(`${Apipath}/api/auth/ragister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: user.name, email: user.email, mobile: user.mobile, password: user.password })
      });
      const json = await response.json()
      console.log(json)

      if (response.ok) {
        toast.success("Ragistration succussful")
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

  return (
    <>
    <Navbar/>
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Ragister Yourself</h1>
              <form method="POST">
                <div>
                  <label className='lable' htmlFor='name'>Name</label>
                  <input type="text" name="name" onChange={handleInput} placeholder='Enter your name' id="name" required autoComplete='off' />
                </div>
                <div>
                  <label className='lable' htmlFor='email'>Email</label>
                  <input type="text" name="email" onChange={handleInput} placeholder='Enter your email' id="email" required autoComplete='off' />
                </div>
                <div>
                  <label className='lable' htmlFor='number'>Mobile</label>
                  <input type="text" name="mobile" onChange={handleInput} placeholder='Enter your phone number' id="mobile" required autoComplete='off' />
                </div>
                <div>
                  <label className='lable' htmlFor='password'>Password</label>
                  <input type="password" name="password" onChange={handleInput} placeholder='Enter your password' id="password" required autoComplete='off' />
                </div>

              </form>
              <div>
                <button type="button" onClick={handleSubmit} className="btn">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup