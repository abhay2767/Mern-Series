import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reset_Password = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email })
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

  return (
    <>
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
    </>
  )
}

export default Reset_Password