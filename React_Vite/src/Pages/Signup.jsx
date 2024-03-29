/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Component/Navbar'
import Footer from "../Component/Footer";
import { Navigate } from 'react-router-dom';
import LoadingSpiner from "../Component/LoadingSpiner";

const Signup = ({ setProgress }) => {
  const navigate = useNavigate();
  const { storeTokenInLs, Apipath, isLoggedIn, isLoading } = useAuth();

  /* const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  } */
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const [image, setimage] = useState('')

  const handleInput1 = (e) => {
    setname(e.target.value)
  }
  const handleInput2 = (e) => {
    setemail(e.target.value)
  }
  const handleInput3 = (e) => {
    setmobile(e.target.value)
  }
  const handleInput4 = (e) => {
    setpassword(e.target.value)
  }

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Signup')} - React_veet`;

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData
      formdata.append('name', name)
      formdata.append('email', email)
      formdata.append('mobile', mobile)
      formdata.append('password', password)
      formdata.append('images', image)

      if (isNaN(mobile)) {
        toast.error("Please enter a valid Mobile number");
      } else {
        const response = await fetch(`${Apipath}/api/auth/ragister`, {
          method: "POST",
          body: formdata,
        });
        const json = await response.json()
        // console.log(json)

        if (response.ok) {
          toast.success("Ragistration succussful")
          navigate('/')
          // console.log(json.token)
          // localStorage.setItem("Token", json.token);
          storeTokenInLs(json.token)
        }
        else {
          toast.error(json.extra_Error ? json.extra_Error : json.message)
        }

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
    return <LoadingSpiner />
  }


  return (
    <>
      <Navbar />
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Ragister Yourself</h1>
              <form method="POST">
                <div>
                  <label className='lable' htmlFor='name'>Name</label>
                  <input type="text" name="name" value={name} onChange={handleInput1} placeholder='Enter your name' id="name" required autoComplete='off' />
                </div>
                <div>
                  <label className='lable' htmlFor='email'>Email</label>
                  <input type="text" name="email" value={email} onChange={handleInput2} placeholder='Enter your email' id="email" required autoComplete='off' />
                </div>
                <div>
                  <label className='lable' htmlFor='number'>Mobile</label>
                  <input type="text" name="mobile" value={mobile} onChange={handleInput3} placeholder='Enter your phone number' id="mobile" required autoComplete='off' />
                </div>
                <div>
                  <label className='lable' htmlFor='password'>Password</label>
                  <input type="password" name="password" value={password} onChange={handleInput4} placeholder='Enter your password' id="password" required autoComplete='off' />
                </div>

                <div>
                  <label className='lable' htmlFor='image'>Upload Image</label>
                  <input type="file" accept="image/*" name="image" onChange={(e) => setimage(e.target.files[0])} placeholder='Upload your image' required autoComplete='off' />
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

export default Signup