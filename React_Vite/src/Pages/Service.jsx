/* eslint-disable react/prop-types */
import { useAuth } from '../store/auth';
import './Design.css'
import Navbar from '../Component/Navbar'
import { useEffect } from 'react';

const Service = ({ setProgress }) => {
  const { serviceData,Apipath } = useAuth();
  console.log(serviceData)
  useEffect(() => {
    setProgress(10)
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
    }, 1500);
  }, [])
  return (
    <>
      <Navbar />
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
};

export default Service;
