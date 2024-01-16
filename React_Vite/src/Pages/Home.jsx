/* eslint-disable react/prop-types */
// import Mata from '../Images/Mata.png'
import './Design.css'
import Navbar from '../Component/Navbar'
import { useAuth } from '../store/auth'
import { useEffect } from 'react'

const Home = ({setProgress}) => {
  const {userAuthentication} = useAuth()
  useEffect(()=>{
    setProgress(10)
    userAuthentication()
    setTimeout(()=>{
      setProgress(100)
    },1500);
  },[])
  /* Change the first latter of word */
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Home')} - React_veet`;
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