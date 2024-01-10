import '../Pages/Design.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Services = () => {
  const navigate = useNavigate();
  const { AuthorizationToken,fetchData } = useAuth();
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
      const response = await fetch('http://localhost:5000/api/admin/services', {
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
  
  return (
    <>
      <div>
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