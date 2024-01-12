/* eslint-disable react/prop-types */
import '../Pages/Design.css'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Services = ({setProgress}) => {
  const navigate = useNavigate();
  const { AuthorizationToken,fetchData,Apipath} = useAuth();
  const [servicess, setServices] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  })

  const handleInput = (e) => {
    setServices({ ...servicess, [e.target.name]: e.target.value })
  }

  const handleSubmit = async() => {
    try {
      const response = await fetch(`${Apipath}/api/admin/services`, {
        method: "POST",
                headers: {
                    Authorization: AuthorizationToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service:servicess.service,
                    description:servicess.description,
                    price:servicess.price,
                    provider:servicess.provider,
                }),
            });
      const json = await response.json()
      console.log(json)

      if (response.ok) {
        toast.success("Services Added succussful")
        navigate('/admin')
        fetchData()
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
      <div className='serv'>
        <h1>Add Services</h1>
        <form method="POST" className='serviceFoem'>
          <label htmlFor="service">Service:</label>
          <input type="text" onChange={handleInput} id="service" name="service"  />

          <label htmlFor="description">Description:</label>
          <input type="text" onChange={handleInput} name="description" rows="4" />

          <label htmlFor="price">Price:</label>
          <input type="text" onChange={handleInput} id="price" name="price"  />

          <label htmlFor="provider">Provider:</label>
          <input type="text" onChange={handleInput} id="provider" name="provider"  />

        </form>
        <button type="button" onClick={handleSubmit} className="btn">SUBMIT</button>
      </div>
    </>
  )
}

export default Admin_Services