import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import '../Pages/Design.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Users = () => {
    const { AuthorizationToken,Apipath } = useAuth();
    const [users, setUsers] = useState([])
    const getAllUsersdata = async () => {
        try {
            const response = await fetch( `${Apipath}/api/admin/users}`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const data = await response.json();
            setUsers(data)
            console.log('Users ' + data)

            if (response.ok) {
                // getAllUsersdata();
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsersdata();
    }, [])

    const deleteUser = async (id) => {
        try {
            console.log("In" + id)
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const data = await response.json()
            console.log(`User After delete${data}`)
            getAllUsersdata();
            toast.success("User Deleted succussfully")
        } catch (error) {
            console.log("This is error" + error)
        }
    }

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1><b>Admin</b> Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((curUsers, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{curUsers.name}</td>
                                            <td>{curUsers.email}</td>
                                            <td>{curUsers.mobile}</td>
                                            <td><button className="btn"><Link to={`/admin/users/${curUsers._id}/edit`}>Edit</Link></button></td>
                                            <td><button className="btn" onClick={() => deleteUser(curUsers._id)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Admin_Users