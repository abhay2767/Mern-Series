/* eslint-disable react/prop-types */
import { useAuth } from '../store/auth'
import '../Pages/Design.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Admin_Contacts = ({ setProgress }) => {
  const { contactData, Apipath } = useAuth();
  const { AuthorizationToken } = useAuth();
  const { fetchContactdata } = useAuth()

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  /* change name in title */
  document.title = `${capitalize('Admin/Contacts')} - React_veet`;

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${Apipath}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      await response.json()
      // console.log(`User After delete${data}`)
      fetchContactdata();
      toast.success("Contact Deleted succussfully")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setProgress(10)
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
    }, 1500);
  }, [])

  return (
    <>
      <div className='bg'>
        <div className='contanier'>
          {
            contactData && contactData.map((conData, index) => {
              const { name, email, message } = conData;
              // console.log(conData)
              return (
                <div key={index} className="card">
                  <div className="name">{name}</div>
                  <div className="email">{email}</div>
                  <div className="message">{message}</div>
                  <button className='button' onClick={() => deleteContact(conData._id)}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Admin_Contacts