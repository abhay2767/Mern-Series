import { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const navigate = useNavigate();
  
  const {fetchContactdata} =useAuth()
  const [data, setData] = useState({
    name:"",
    email:"",
    message:"",
  })
  
  const [userdata, setuserData] = useState(true)
  const {user} = useAuth();
  if(userdata && user){
    setData({
      name:user.name,
      email:user.email,
      message:'',
    });

    setuserData(false)
  }


  const handleInput=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

const handleSubmit=async(e)=>{
  e.preventDefault();
  console.log(data)
  try {
    const response = await fetch(`http://localhost:5000/api/form/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name:data.name, email:data.email,message:data.message})
        });
        const json = await response.json()
        console.log(json)



        if(response.ok){
          navigate('/')
          fetchContactdata();
        }
        toast.success("Message Send successful")
        

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
                <h1 className='main-heading '>Contact Us</h1>
                <form  method="POST">
                <div>
                  <label className='lable' htmlFor='username'>Name</label>
                  <input type="text" name="name" value={data.name} onChange={handleInput} placeholder='Enter your name' id="name" required autoComplete='off' />
                </div>
                
                <div>
                  <label className='lable' htmlFor='password'>Email</label>
                  <input type="text" name="email" value={data.email} onChange={handleInput} placeholder='Enter your email' id="email" required autoComplete='off' />
                </div>

                <div>
                  <label className='lable' htmlFor='password'>Message</label>
                  <input type="text" name="message" value={data.message} onChange={handleInput} placeholder='Enter your message' id="message" required autoComplete='off' />
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

export default Contact