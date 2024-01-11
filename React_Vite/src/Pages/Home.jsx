// import Mata from '../Images/Mata.png'
import './Design.css'
import Navbar from '../Component/Navbar'
import { useAuth } from '../store/auth'
import { useEffect } from 'react'

const Home = () => {
  const {userAuthentication} = useAuth()
  useEffect(()=>{
    userAuthentication()
  },[])
  
  return (
    <>
    <Navbar/>
    <div className='bg'>
      {/* <img className="photo" src={Mata} alt="mata" height={700} width={600} /> */}
    </div>
    </>
  )
}

export default Home