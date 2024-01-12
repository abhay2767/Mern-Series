/* eslint-disable react/prop-types */
import Navbar from "../Component/Navbar"
import { useEffect } from "react"

const Error = ({setProgress}) => {
  useEffect(()=>{
    setProgress(10)
    setProgress(50)
    setTimeout(()=>{
      setProgress(100)
    },1500);
  },[])
  return (
    <>
    <Navbar/>
    <div >This is 404 </div>
    </>
  )
}

export default Error