import Navbar from '../Component/Navbar'
import './OTP.css'
import EmailOtp from '../Component/EmailOtp'
import Footer from '../Component/Footer'

const Verify_Email = () => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Verify-email')} - React_veet`;

  return (
    <>
      <Navbar />
      <div className='apps'>
        <h1>Verify-Email</h1>
        <EmailOtp />
      </div>
      <Footer />
    </>
  )
}

export default Verify_Email