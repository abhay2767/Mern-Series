/* eslint-disable react/prop-types */
import { useAuth } from '../store/auth';
import './Design.css'
import Navbar from '../Component/Navbar'
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Service = ({ setProgress }) => {
  const { serviceData, Apipath } = useAuth();
  console.log(serviceData)
  const [SData, setSData] = useState('')
  const [searchdata, setsearchdata] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${Apipath}/api/service/servicedata/search`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({search:SData})
    })
    const json = await response.json()
    setsearchdata(json.service_data)
  }



  useEffect(() => {
    setProgress(10)
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
    }, 1500);
  }, [])

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Service')} - React_veet`;
  return (
    <>
      <Navbar />
      <form method='POST'>
        <div className='searchbar'>
          <div className="search-container">
            <input type="text" id="search-input" value={SData} onChange={(e)=>{setSData(e.target.value);}} placeholder="Search services..." />
            <button className="search-button" onClick={handleSubmit}><FaSearch /></button>
          </div>
        </div>
      

      {
  searchdata ? (
    searchdata && searchdata.map((currdata, index) => (
      <div key={index} className="card">
        <img src={`${Apipath}/api/images/${currdata.images}`} alt="" height={100} width={250} />
        
        
        <label className="lable" htmlFor="service">Service:</label>
        <p className='para'>{currdata.service}</p>

        <label className="lable" htmlFor="description">Description:</label>
        <p className='para'>{currdata.description}</p>

        <label className="lable" htmlFor="price">Price:</label>
        <p className='para'>{currdata.price}</p>

        <label className="lable" htmlFor="provider">Provider:</label>
        <p className='para'>{currdata.provider}</p>
      </div>
    ))
  ) : "Data not found"
}
</form>



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
