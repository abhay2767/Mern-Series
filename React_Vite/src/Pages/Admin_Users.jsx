/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import '../Pages/Design.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin_Users = ({ setProgress }) => {
    const { AuthorizationToken, Apipath } = useAuth();
    const [users, setUsers] = useState([])
    const getAllUsersdata = async () => {
        setProgress(10)
        try {
            const response = await fetch(`${Apipath}/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            setProgress(50)
            const data = await response.json();
            setUsers(data)
            // console.log('Users ' + data)

            if (response.ok) {
                // getAllUsersdata();
            }
            setProgress(100)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsersdata();
    }, [])

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    /* change name in title */
    document.title = `${capitalize('Admin/Users')} - React_veet`;

    const deleteUser = async (id) => {
        try {
            // console.log("In" + id)
            const response = await fetch(`${Apipath}/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            await response.json()
            // console.log(`User After delete${data}`)
            getAllUsersdata();
            toast.success("User Deleted succussfully")
        } catch (error) {
            console.log(error)
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
                                            <td><Link to={`/admin/users/${curUsers._id}/edit`}><button className="btn">Edit</button></Link></td>
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