import photo from '../Images/Ragister.jpg'
import { useAuth } from '../store/auth';
import './Design.css'



const Service = () => {
  const { serviceData } = useAuth();

  return (
    <>
      <div>
        
        {serviceData && serviceData.map((data, index) => {
          const { service, price, description, provider } = data;
          return (
            <div key={index} className="card">
              <h2>Service Card</h2>
              <img src = {photo} alt="" height={200} width={225}/>
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
