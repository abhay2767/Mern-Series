/* eslint-disable react/prop-types */
import { useAuth } from "../store/auth"
import { useEffect } from "react"
import './Design.css'
import { Navigate } from 'react-router-dom';

const Profile = ({ setProgress }) => {
  const { user, Apipath, isLoggedIn, isLoading } = useAuth();
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
  document.title = `${capitalize('MyAccount/profile')} - React_veet`;


  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }
  if (isLoading) {
    return <h1>Loading..</h1>
  }
  if (!user) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <div className="container">
        <form className="profile-height">
          <div className="account">
            <img className="user" src={`${Apipath}/api/images/${user.images}`} alt="" />
          </div>
          <div className="row1">
            <div className="col-25">
            </div>
            <div className="col-75">
              <input type="text" id="fname" value={user.name} name="firstname" placeholder="Your name.." />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
            </div>
            <div className="col-75">
              <input type="text" id="fname" value={user.email} name="firstname" placeholder="Your email.." />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
            </div>
            <div className="col-75">
              <input type="text" id="fname" value={user.mobile} name="firstname" placeholder="Your mobile.." />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Profile