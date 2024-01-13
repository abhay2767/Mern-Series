/* eslint-disable react/prop-types */
import '../Pages/Design.css'
import { useState, useEffect } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Services = ({ setProgress }) => {
  const { serviceData } = useAuth();
  const { AuthorizationToken, fetchData, Apipath } = useAuth();
  /* const [servicess, setServices] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  }) */

  const [service, setservice] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [provider, setprovider] = useState('')
  const [image, setimage] = useState('')

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

  const handleSubmit = async () => {
    try {
      const formdata = new FormData
      formdata.append('service', service)
      formdata.append('description', description)
      formdata.append('price', price)
      formdata.append('provider', provider)
      formdata.append('images', image)

      const response = await fetch(`${Apipath}/api/admin/services`, {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formdata,
      });
      const json = await response.json()
      console.log(json)

      if (response.ok) {
        toast.success("Services Added succussful")
        fetchData()
        // navigate('/admin')
        setservice('')
        setdescription('')
        setprice('')
        setprovider('')
        setimage('')
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
  return (
    <>
      <div className='serv'>
        <h1>Add Services</h1>

        <form method="POST" className='serviceFoem'>
          <label htmlFor="image">Upload Image:</label>
          <input type="file" onChange={(e) => setimage(e.target.files[0])} id="image" />

          <label htmlFor="service">Service:</label>
          <input type="text" onChange={handleInput1} id="service" value={service} />

          <label htmlFor="description">Description:</label>
          <input type="text" onChange={handleInput2} value={description} rows="4" />

          <label htmlFor="price">Price:</label>
          <input type="text" onChange={handleInput3} id="price" value={price} />

          <label htmlFor="provider">Provider:</label>
          <input type="text" onChange={handleInput4} id="provider" value={provider} />

        </form>
        <button type="button" onClick={handleSubmit} className="btn">SUBMIT</button>
      </div>

      <div>
        <h1>Services</h1>
        {serviceData && serviceData.map((data, index) => {
          const { service, price, description, provider, images } = data;
          return (
            <div key={index} className="card">
              <h2>Service Card</h2>
              <img src={`${Apipath}/api/images/${images}`} alt="" height={100} width={250} />
              <label className="lable" htmlFor="service">Service:</label>
              <p className='para'>{service}</p>

              <label className="lable" htmlFor="description">Description:</label>
              <p className='para'>{description}</p>

              <label className="lable" htmlFor="price">Price:</label>
              <p className='para'>{price}</p>

              <label className="lable" htmlFor="provider">Provider:</label>
              <p className='para'>{provider}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Admin_Services