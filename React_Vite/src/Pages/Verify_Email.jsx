/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../store/auth';
import Navbar from '../Component/Navbar'

const Verify_Email = ({setProgress}) => {
  const navigate = useNavigate();
  const { user,Apipath } = useAuth();
  console.log(user.email)

  const [data, setData] = useState({
    email: "",
  });

  const [userdata, setuserData] = useState(true)
  if (userdata && user) {
    setData({
      email: user.email,
    });

    setuserData(false)
  }
  
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      const response = await fetch(`${Apipath}/api/auth/send-mail-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: data.email })
      });
      const json = await response.json()
      console.log(json)

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
  useEffect(()=>{
    setProgress(10)
    setProgress(50)
    setTimeout(()=>{
      setProgress(100)
    },1500);
  },[])

  return (
    <>
    <Navbar/>
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Verify Email</h1>
              <form method="POST">

                <div>
                  <label className='lable' htmlFor='email'>Email</label>
                  <input type="text" name="email"  value={data.email} onChange={handleInput} placeholder='Enter your email' id="email" required autoComplete='off' />
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

export default Verify_Email