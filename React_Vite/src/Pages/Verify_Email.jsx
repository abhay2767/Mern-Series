import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../store/auth';

const Verify_Email = () => {
  const navigate = useNavigate();
  const { user,Apipath } = useAuth();

  const [data, setData] = useState({
    email: user.email,
  });
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

  return (
    <>
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Verify Email</h1>
              <form method="POST">

                <div>
                  <label className='lable' htmlFor='email'>Email</label>
                  <input type="text" name="email" value={user.email} onChange={handleInput} placeholder='Enter your email' id="email" required autoComplete='off' />
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