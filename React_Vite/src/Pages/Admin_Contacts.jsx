import { useAuth } from '../store/auth'
import '../Pages/Design.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Contacts = () => {

  const { contactData } = useAuth();
  const {AuthorizationToken} = useAuth();
  const {fetchContactdata} =useAuth()


  const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json()
      console.log(`User After delete${data}`)
      fetchContactdata();
      toast.success("Contact Deleted succussfully")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>
        {
          contactData && contactData.map((conData, index) => {
            const { name, email, message } = conData;
            console.log(conData)
            return (
              <div key={index} className="card">
                <div className="name">{name}</div>
                <div className="email">{email}</div>
                <div className="message">{message}</div>
                <button className='button' onClick={()=>deleteContact(conData._id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    </>

  )
}

export default Admin_Contacts