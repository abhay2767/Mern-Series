import Navbar from '../Component/Navbar'
import './OTP.css'
import EmailOtp from '../Component/EmailOtp'
const Verify_Email = () => {


  return (
    <>
      <Navbar />
      <div className='apps'>
        <h1>Verify-Email</h1>
        <EmailOtp />
      </div>

    </>
  )
}

export default Verify_Email