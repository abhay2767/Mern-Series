import './Navbar.css'
import Abhay from '../Images/Mata.png'
const Footer = () => {
  return (
    <div className='copyright'>
      <img className="avatar" src={Abhay} alt='developer' height={50} width={50} />
      <h1 className='footer-heading'>Developed by Abhay Dubey:- abhaydubey2767@gmail.com </h1>
    </div>
  )
}

export default Footer