import '../Pages/Design.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Services = () => {
  const navigate = useNavigate();
  const { AuthorizationToken,fetchData } = useAuth();

  const [service, setservice] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [provider, setprovider] = useState('')


  const handleInput1 = (e) => {
    setservice(e.target.value)
  }
  const handleInput2 = (e) => {
    setdescription(e.target.value)
  }
  const handleInput3 = (e) => {
    setprice(e.target.value)
  }
  const handleInput4 = (e) => {
    setprovider(e.target.value)
  }
  /* const handleInput = (e) => {
    setServices({ ...servicess, [e.target.name]: e.target.value })
  } */

 

  const handleSubmit = async() => {
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/services', {
        method: "POST",
                headers: {
                    Authorization: AuthorizationToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  service:service,
                  description:description,
                  price:price,
                  provider:provider,
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
  return (
    <>
      <div>
        <h1>Service Page</h1>
        <form method="POST" className='serviceFoem'>
          <label htmlFor="service">Service:</label>
          <input type="text" onChange={handleInput1} id="service" name="service"  />

          <label htmlFor="description">Description:</label>
          <input type="text" onChange={handleInput2} name="description" rows="4" />

          <label htmlFor="price">Price:</label>
          <input type="text" onChange={handleInput3} id="price" name="price"  />

          <label htmlFor="provider">Provider:</label>
          <input type="text" onChange={handleInput4} id="provider" name="provider"  />

        </form>
        <button type="button" onClick={handleSubmit} className="btn">SUBMIT</button>
      </div>
    </>
  )
}

export default Admin_Services