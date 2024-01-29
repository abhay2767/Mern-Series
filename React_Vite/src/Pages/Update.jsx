import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Update = ({ setProgress }) => {
  const { user, Apipath, AuthorizationToken } = useAuth()
  const navigate = useNavigate();

  const [name, setname] = useState(user.name)
  const [mobile, setmobile] = useState(user.mobile)
  const [image, setimage] = useState('')

  const handleInput1 = (e) => {
    setname(e.target.value)
  }

  const handleInput3 = (e) => {
    setmobile(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData
      formdata.append('name', name)
      formdata.append('mobile', mobile)
      formdata.append('images', image)
      const response = await fetch(`${Apipath}/api/auth/update-myAccount`, {
        method: "PATCH",
        body: formdata,
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const json = await response.json()
      // console.log(json)
      if (response.ok) {
        toast.success("Updation succussful");
        navigate('/')
      }
      else {
        toast.error(json.extra_Error ? json.extra_Error : json.message)
      }
      // console.log(json.token)
      // localStorage.setItem("Token", json.token);
    } catch (error) {
      console.log(error)
    }
  }

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('MyAccount/Update-profile')} - React_veet`;




  useEffect(() => {
    setProgress(10)
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
    }, 1500);
  }, [])


  return (
    <>
      <div className="float-container">
        <div className="float-child">
          <div className="blue">
            <div className="ragistration-form">
              <h1 className='main-heading '>Update Yourself</h1>
              <form method="POST">
                <div>
                  <label className='lable' htmlFor='name'>Name</label>
                  <input type="text" name="name" value={name} onChange={handleInput1} placeholder='Enter your name' id="name" required autoComplete='off' />
                </div>

                <div>
                  <label className='lable' htmlFor='number'>Mobile</label>
                  <input type="text" name="mobile" value={mobile} onChange={handleInput3} placeholder='Enter your phone number' id="mobile" required autoComplete='off' />
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
    </>
  )
}

export default Update