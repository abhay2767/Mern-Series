import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Contact from "./Pages/Contact"
import Service from "./Pages/Service"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer"
import Error from "./Pages/Error"
import Logout from "./Pages/Logout"
import Reset_Password from "./Pages/Reset_Password"
import Verify_Email from "./Pages/Verify_Email"

import Admin_Layout from "./Component/Layouts/Admin_Layout"
import Admin_Contacts from "./Pages/Admin_Contacts"
import Admin_Users from "./Pages/Admin_Users"
import Admin_UserUpdate from "./Pages/Admin_UserUpdate"
import Admin_Services from "./Pages/Admin_Services";

const App = () => {

  return <>

    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/service' element={<Service />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/reset-password' element={<Reset_Password />} />
      <Route path='/verify-email' element={<Verify_Email />} />
      <Route path='*' element={<Error />} />

      {/* Nested Route */}
      <Route path='/admin' element={<Admin_Layout />}>
        <Route path='users' element={<Admin_Users />} />
        <Route path='contacts' element={<Admin_Contacts />} />
        <Route path='users/:id/edit' element={<Admin_UserUpdate />} />
        <Route path='servicepage' element={<Admin_Services />} />
      </Route>

    </Routes>
    <Footer />
  </>
}

export default App