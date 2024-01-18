import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Service from "./Pages/Service"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Footer from "./Component/Footer"
import Error from "./Pages/Error"
import Logout from "./Pages/Logout"
import MyAccount from "./Pages/MyAccount"
import Reset_Password from "./Pages/Reset_Password"
import Verify_Email from "./Pages/Verify_Email"

import Admin_Layout from "./Component/Layouts/Admin_Layout"
import Admin_Contacts from "./Pages/Admin_Contacts"
import Admin_Users from "./Pages/Admin_Users"
import Admin_UserUpdate from "./Pages/Admin_UserUpdate"
import Admin_Services from "./Pages/Admin_Services";

import LoadingBar from 'react-top-loading-bar'
import { useState } from "react"

const App = () => {
  const [progress, setProgress] = useState(0)
  return <>
  <LoadingBar
        height={3}
        color= "cyan"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    

    <Routes>
      <Route path='/' element={<Home setProgress={setProgress}/>} />
      <Route path='/contact' element={<Contact setProgress={setProgress}/>} />
      <Route path='/service' element={<Service setProgress={setProgress}/>} />
      <Route path='/signup' element={<Signup setProgress={setProgress}/>} />
      <Route path='/login' element={<Login setProgress={setProgress}/>} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/myAccount' element={<MyAccount setProgress={setProgress}/>} />
      <Route path='/reset-password' element={<Reset_Password setProgress={setProgress}/>} />
      <Route path='/verify-email' element={<Verify_Email setProgress={setProgress}/>} />
      <Route path='*' element={<Error setProgress={setProgress}/>} />

      {/* Nested Route */}
      <Route path='/admin' element={<Admin_Layout setProgress={setProgress} />}>
        <Route path='users' element={<Admin_Users setProgress={setProgress}/>} />
        <Route path='contacts' element={<Admin_Contacts setProgress={setProgress}/>} />
        <Route path='users/:id/edit' element={<Admin_UserUpdate setProgress={setProgress}/>} />
        <Route path='servicepage' element={<Admin_Services setProgress={setProgress}/>} />
      </Route>

    </Routes>
    <Footer />
  </>
}

export default App